<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['auth'])->group(function() {

  Route::get('/users', [UsersController::class, 'index']);
  Route::post('/users', [UsersController::class, 'store']);
  Route::put('/users/{id}', [UsersController::class, 'update']);
  Route::delete('/users/{id}', [UsersController::class, 'delete']);

  Route::get('/products', [ProductsController::class, 'index']);
  Route::post('/products', [ProductsController::class, 'store']);
  Route::put('/products/{id}', [ProductsController::class, 'update']);
  Route::delete('/products/{id}', [ProductsController::class, 'delete']);

  
});

Route::get('/categories', [CategoriesController::class, 'index']);
Route::post('/categories', [CategoriesController::class, 'store']);
Route::put('/categories/{id}', [CategoriesController::class, 'update']);
Route::delete('/categories/{id}', [CategoriesController::class, 'delete']);





