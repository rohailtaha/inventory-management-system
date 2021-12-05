<?php

use App\Http\Controllers\AuthController;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

Route::post('/login', [AuthController::class, 'login'])->middleware('guest', 'active.login');

Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth');

Route::post('/forgot-password', [AuthController::class, 'sendPasswordResetEmail'])->middleware('guest');

Route::get('/login/status', function () {
  return auth()->user() ?
  response([
    'user' => new UserResource(User::findOrFail(auth()->user()->id)),
    'status' => 'OK',
  ], 200) :
  response(['error' => ['msg' => 'The user is not authenticated.'], 'status' => 'ERROR'], 401);
});

Route::get('/reset-password/{token}', function ($token) {
  return view('auth.reset-password', ['token' => $token]);
})->middleware('guest')->name('password.reset');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])->middleware('guest');

Route::get('/', function () {
  return view('index');
})->name('root');

Route::get('/{path}', function () {
  return view('index');
})->where('path', '.*');
