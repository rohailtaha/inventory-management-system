<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller {

  public function login(Request $request) {

    $validator = Validator::make($request->all(), [
      'email' => 'required|email|max:255',
      'password' => 'required|max:50|min:5',
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    if (!Auth::attempt($request->only(['email', 'password']), $request->remember)) {
      return response(['error' => ['msg' => 'Invalid Login Credentials'], 'status' => 'ERROR'], 200);
    }

    $user = User::where('email', $request->email)->first();

    return response([
      'user' => $user->requiredFields(),
      'status' => 'OK',
    ], 200);
  }

  public function logout(Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(
      ['error' => ['msg' => $errorMsg], 'status' => 'ERROR'],
      200
    );
  }
}
