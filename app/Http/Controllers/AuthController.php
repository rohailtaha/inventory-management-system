<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{

    public function login(Request $request) {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|max:50|min:5'
        ]);

        if($validator->stopOnFirstFailure()->fails()) {
            $errorMsg = Arr::flatten($validator->errors()->messages())[0];
            return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 200);
        }

        if(!Auth::attempt($request->only(['email', 'password']), true)) {
            return response(['error' => ['msg' => 'Invalid Login Credentials']], 200);
        }

        $user = User::where('email', $request->only('email'))->first();

        return response([
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'role' => $user->roles[0]->name,
            ],
            'status' => 'OK', 
        ], 200);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
