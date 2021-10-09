<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{


    public function login(Request $request) {

        $credentials =  $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|max:50|min:5'
        ]);

        if(!Auth::attempt($credentials, true)) {
            return response(['error' => 'Invalid Login Credentials'], 401);
        }

        $user = User::where('email', $request->only('email'))->first();

        return response([
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'role' => $user->roles[0]->name,
        ], 200);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
