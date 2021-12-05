<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
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

    if (!Auth::attempt($request->only('email', 'password'), $request->remember)) {
      return response(['error' => ['msg' => 'Invalid Login Credentials'], 'status' => 'ERROR'], 401);
    }

    return response([
      'user' => new UserResource(User::where('email', $request->email)->firstOrFail()),
      'status' => 'OK',
    ], 200);

  }

  public function sendPasswordResetEmail(Request $request) {
    $validator = Validator::make($request->all(), [
      'email' => 'required|email',
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $status = Password::sendResetLink(
      $request->only('email')
    );

    return $status === Password::RESET_LINK_SENT ?
    response(['status' => 'OK'], 200) :
    response(['error' => ['msg' => 'We could not send you the verification email. Kindly contact the administrator to reset your password.'], 'status' => 'ERROR'], 500);
  }

  public function logout(Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response(['status' => 'OK'], 200);
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(
      ['error' => ['msg' => $errorMsg], 'status' => 'ERROR'],
      401
    );
  }
}
