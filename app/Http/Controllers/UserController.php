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
use Illuminate\Validation\Rules\Password;

class UserController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('updatePassword');
    $this->middleware('shop.confirm:User')->only('update', 'destroy');
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
      'name' => 'max:255|required',
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
      'name' => 'max:255|required',
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

  public function updateCurrentUser(Request $request) {
    $validator = Validator::make($request->all(), [
      'name' => 'max:255|required',
      'email' => ['email', 'required', 'max:255', Rule::unique('users')->ignore(auth()->user()->id)],
      'phone' => ['required', 'min:4', 'max:20', Rule::unique('users')->ignore(auth()->user()->id)],
    ]);

    if ($this->userDataInvalid($validator)) {
      return $this->errorResponse($validator);
    }
    $user = User::findOrFail(auth()->user()->id);
    $user->update($request->only('name', 'email', 'phone'));

    return response(['user' => $user->fresh()->requiredFields(), 'status' => 'OK'], 200);

  }

  public function updatePassword(Request $request) {
    $validator = Validator::make($request->all(), [
      'old_password' => 'min:5|max:255|required',
      'new_password' => ['max:255', 'required', 'confirmed', Password::min(5)],
      'new_password_confirmation' => ['required', 'min:5', 'max:255'],
    ]);

    if ($this->userDataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    if (Hash::check($request->old_password, auth()->user()->password)) {
      $user = User::findOrFail(auth()->user()->id);
      $user->update(['password' => Hash::make($request->new_password)]);
      return response(['status' => 'OK'], 200);
    }

    return response(['error' => ['msg' => 'Old password is incorrect.'], 'status' => 'ERROR'], 400);
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
