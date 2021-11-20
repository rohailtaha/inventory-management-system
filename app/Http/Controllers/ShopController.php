<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class ShopController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('index');
  }

  public function index() {
    $shop = Shop::select(Shop::$requiredFields)->where('id', auth()->user()->shop_id)->firstOrFail();
    return response(['shop' => $shop, 'status' => 'OK'], 200);
  }

  public function update(Request $request) {

    $validator = Validator::make($request->all(), [
      'name' => 'required|max:255',
      'contact' => 'required|min:4|max:20',
      'address' => 'required|max:255',
    ]);

    if ($this->dataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    $shop = Shop::findOrFail(auth()->user()->shop_id);
    $shop->update($request->only('name', 'contact', 'address'));
    return response(['shop' => $shop->fresh(), 'status' => 'OK'], 200);
  }

  private function dataInvalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 400);
  }
}
