<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
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

Route::middleware(['auth', 'active'])->group(function () {
  Route::get('/shop', [ShopController::class, 'index']);
  Route::put('/shop', [ShopController::class, 'update']);

  Route::get('/users', [UserController::class, 'index']);
  Route::post('/users', [UserController::class, 'store']);
  Route::put('/users/{id}', [UserController::class, 'update']);
  Route::put('/user', [UserController::class, 'updateCurrentUser']);
  Route::put('/user/update-password', [UserController::class, 'updatePassword']);
  Route::delete('/users/{id}', [UserController::class, 'destroy']);

  Route::get('/products', [ProductController::class, 'index']);
  Route::post('/products', [ProductController::class, 'store']);
  Route::put('/products/{id}', [ProductController::class, 'update']);
  Route::delete('/products/{id}', [ProductController::class, 'destroy']);
  Route::post('/some-products', [ProductController::class, 'getProducts']);

  Route::get('/categories', [CategoryController::class, 'index']);
  Route::post('/categories', [CategoryController::class, 'store']);
  Route::put('/categories/{id}', [CategoryController::class, 'update']);
  Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

  Route::get('/suppliers', [SupplierController::class, 'index']);
  Route::post('/suppliers', [SupplierController::class, 'store']);
  Route::put('/suppliers/{id}', [SupplierController::class, 'update']);
  Route::delete('/suppliers/{id}', [SupplierController::class, 'destroy']);

  Route::get('/customers', [CustomerController::class, 'index']);
  Route::post('/customers', [CustomerController::class, 'store']);
  Route::put('/customers/{id}', [CustomerController::class, 'update']);
  Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

  Route::get('/sales', [SaleController::class, 'index']);
  Route::get('/sales/highest', [SaleController::class, 'highestSales']);
  Route::post('/sales', [SaleController::class, 'store']);
  Route::put('/sales/{id}', [SaleController::class, 'update']);
  Route::delete('/sales/{id}', [SaleController::class, 'destroy']);

  Route::get('/purchases', [PurchaseController::class, 'index']);
  Route::post('/purchases', [PurchaseController::class, 'store']);
  Route::put('/purchases/{id}', [PurchaseController::class, 'update']);
  Route::delete('/purchases/{id}', [PurchaseController::class, 'destroy']);
});
