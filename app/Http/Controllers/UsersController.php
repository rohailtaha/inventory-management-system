<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function index() {
        $user = auth()->user();
        $users = User::where([['shop_id', $user->shop_id], ['id', '!=', $user->id]])->orderByDesc('created_at')->get();
        $users->transform(function($user) {
            return $user->get();
        });
        return response(['users' => $users],  200);
    }

    public function store(Request $request) {

        $validator = $request->validate([
            'name' => 'min:3|max:255|required',
            'email' => 'email|required|max:255|unique:users',
            'password' => 'required|min:5|max:50',
            'phone' => 'required|min:4|max:20|unique:users',
            'active' => 'required|integer|min:0|max:1'
        ]);
        $user = User::create([
            'name' => $request->name,
            'shop_id' => auth()->user()->shop_id,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'active' => $request->active,
        ]);
        $role = Role::select('id')->where('name', 'EMPLOYEE')->first();
        $user->roles()->attach($role);
        return response(['user' => $user->get()], 200);
    }


    public function update(Request $request, $id) {
        $request->validate([
            'name' => 'min:3|max:255|required',
            'email' => 'email|required|max:255',
            'password' => 'nullable|max:50|min:6|unique:users',
            'phone' => 'required|min:4|max:20',
            'active' => 'required|integer|min:0|max:1'
        ]);
        User::where([['id', $id],['shop_id', auth()->user()->shop_id]])->update(
            [
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phone' => $request->phone,
                'active' => $request->active,
            ]
        );
        $user = User::where('id', $id)->first();
        return response(['user' => $user->get()], 200);
    }

    public function delete(Request $request, $id) {
        User::where([['id', $id], ['shop_id', auth()->user()->shop_id]])->first()->delete();
        return response(['id' => $id],200);
    }
}
