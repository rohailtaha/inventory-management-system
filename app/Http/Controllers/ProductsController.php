<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Rules\UniqueProductBarcode;
use App\Rules\UniqueProductName;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller {
  public function index() {
    $user = auth()->user();
    $products = Product::where('shop_id', $user->shop_id)->orderByDesc('created_at')->get();
    $products->transform(function ($product) {
      return $product->get();
    });
    return response(['status' => 'OK', 'products' => $products], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'barcode' => ['required', 'min:1', 'max:255', new UniqueProductBarcode],
      'name' => ['required', 'min:1', 'max:255', new UniqueProductName],
      'category' => 'required|exists:categories,name',
      'description' => 'nullable|max:65535',
      'quantity' => 'required|integer|min:0|max:4294967295',
      'alert_quantity' => 'nullable|integer|min:0|max:16777215',
      'purchase_price' => 'required|numeric|min:0',
      'sale_price' => 'required|numeric|min:0',
      'discount' => 'required|numeric|min:0|max:100',
      'final_sale_price' => 'required|numeric|min:0|lte:sale_price',
    ]);

    if ($this->dataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    $product = Product::create([
      'shop_id' => auth()->user()->shop_id,
      'barcode' => $request->barcode,
      'name' => $request->name,
      'category_id' => Category::select('id')->where('name', $request->category)->first()->id,
      'description' => $request->description,
      'quantity' => $request->quantity,
      'alert_quantity' => $request->alert_quantity,
      'purchase_price' => $request->purchase_price,
      'sale_price' => $request->sale_price,
      'discount' => $request->discount,
      'final_sale_price' => $request->final_sale_price,
    ]);

    return response(['product' => $product->get(), 'status' => 'OK'], 200);
  }

  public function update(Request $request, $id) {
    $validator = Validator::make($request->all(), [
      'barcode' => ['required', 'min:1', 'max:255'],
      'name' => ['required', 'min:1', 'max:255'],
      'category' => 'required|exists:categories,name',
      'description' => 'nullable|max:65535',
      'quantity' => 'required|integer|min:0|max:4294967295',
      'alert_quantity' => 'nullable|integer|min:0|max:16777215',
      'purchase_price' => 'required|numeric|min:0',
      'sale_price' => 'required|numeric|min:0',
      'discount' => 'required|numeric|min:0|max:100',
      'final_sale_price' => 'required|numeric|min:0|lte:sale_price',
    ]);

    if ($this->dataInvalid($validator)) {
      return $this->errorResponse($validator);
    }

    Product::where([['id', $id], ['shop_id', auth()->user()->shop_id]])->update([
      'shop_id' => auth()->user()->shop_id,
      'barcode' => $request->barcode,
      'name' => $request->name,
      'category_id' => Category::select('id')->where('name', $request->category)->first()->id,
      'description' => $request->description,
      'quantity' => $request->quantity,
      'alert_quantity' => $request->alert_quantity,
      'purchase_price' => $request->purchase_price,
      'sale_price' => $request->sale_price,
      'discount' => $request->discount,
      'final_sale_price' => $request->final_sale_price,
    ]);
    $product = Product::where('id', $id)->first();
    return response(['product' => $product->get(), 'status' => 'OK'], 200);
  }

  public function destroy($id) {
    Product::where([['id', $id], ['shop_id', auth()->user()->shop_id]])->first()->delete();
    return response(['id' => $id, 'status' => 'OK'], 200);
  }

  private function dataInvalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 200);
  }
}
