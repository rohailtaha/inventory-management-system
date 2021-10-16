<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SuppliersController;
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

Route::middleware(['auth'])->group(function () {

  Route::get('/users', [UsersController::class, 'index']);
  Route::post('/users', [UsersController::class, 'store']);
  Route::put('/users/{id}', [UsersController::class, 'update']);
  Route::delete('/users/{id}', [UsersController::class, 'delete']);

  Route::get('/products', [ProductsController::class, 'index']);
  Route::post('/products', [ProductsController::class, 'store']);
  Route::put('/products/{id}', [ProductsController::class, 'update']);
  Route::delete('/products/{id}', [ProductsController::class, 'delete']);

  Route::get('/categories', [CategoriesController::class, 'index']);
  Route::post('/categories', [CategoriesController::class, 'store']);
  Route::put('/categories/{id}', [CategoriesController::class, 'update']);
  Route::delete('/categories/{id}', [CategoriesController::class, 'delete']);

  Route::get('/suppliers', [SuppliersController::class, 'index']);
  Route::post('/suppliers', [SuppliersController::class, 'store']);
  Route::put('/suppliers/{id}', [SuppliersController::class, 'update']);
  Route::delete('/suppliers/{id}', [SuppliersController::class, 'delete']);

  Route::get('/customers', [CustomersController::class, 'index']);
  Route::post('/customers', [CustomersController::class, 'store']);
  Route::put('/customers/{id}', [CustomersController::class, 'update']);
  Route::delete('/customers/{id}', [CustomersController::class, 'delete']);
});
