<?php

use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Auth;
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

Route::post('/login', [LoginController::class, 'login'])->middleware('guest')->name('login');

Route::get('/logout', [LoginController::class, 'logout'])->middleware('auth');

Route::get('/login_status', function() {
    if(auth()->user()) { 
        $user = auth()->user();
        return response([
        'loggedin' => true,    
        'name'=> $user->name,
        'phone'=> $user->phone,
        'email'=> $user->email,
        'role'=> $user->roles[0]->name,
        ], 200);
    } 
    return response(['loggedin' => false], 200);
});

Route::get('/{path?}', function () {
    return view('index');
});


