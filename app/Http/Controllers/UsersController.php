<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Rules\UniqueEmailEdit;
use App\Rules\UniquePhoneEdit;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsersController extends Controller {

  public function __construct() {
    $this->middleware('admin');
    $this->middleware('shop.confirm:User')->except('index', 'store');
  }

  public function index() {
    $users = User::where([['shop_id', auth()->user()->shop_id], ['id', '!=', auth()->user()->id]])->orderByDesc('created_at')->get();
    $users->transform(function ($user) {
      return $user->requiredFields();
    });
    return response(['users' => $users, 'status' => 'OK'], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'role' => ['required', Rule::exists('roles', 'name')],
      'name' => 'min:3|max:255|required',
      'email' => 'email|required|max:255|unique:users',
      'password' => 'required|min:5|max:50',
      'phone' => 'required|min:4|max:20|unique:users',
      'active' => 'required|integer|min:0|max:1',
    ]);

    if ($this->userDataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    $user = User::create([
      'name' => $request->name,
      'shop_id' => auth()->user()->shop_id,
      'email' => $request->email,
      'password' => Hash::make($request->password),
      'phone' => $request->phone,
      'active' => $request->active,
    ]);

    $role = Role::where('name', $request->role)->first();
    $user->roles()->attach($role);
    return response(['user' => $user->requiredFields(), 'status' => 'OK'], 200);
  }

  public function update(Request $request, $id) {

    $validator = Validator::make($request->all(), [
      'role' => ['required', Rule::exists('roles', 'name')],
      'name' => 'min:3|max:255|required',
      'email' => ['email', 'required', 'max:255', new UniqueEmailEdit(['id' => $id])],
      'password' => 'nullable|max:50|min:6',
      'phone' => ['required', 'min:4', 'max:20', new UniquePhoneEdit(['id' => $id])],
      'active' => 'required|integer|min:0|max:1',
    ]);

    if ($this->userDataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    $user = User::findOrFail($id);
    // delete old roles of user.
    DB::delete('delete from role_user where user_id = ?', [$user->id]);
    // update user
    $user->update(
      [
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'phone' => $request->phone,
        'active' => $request->active,
      ]
    );
    //add new roles of user.
    $role = Role::where('name', $request->role)->first();
    $user->roles()->attach($role);
    return response(['user' => $user->fresh()->requiredFields(), 'status' => 'OK'], 200);
  }

  public function destroy($id) {
    User::find($id)->delete();
    return response(['id' => $id, 'status' => 'OK'], 200);
  }

  private function userDataInvalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 200);
  }
}
