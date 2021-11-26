<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use function PHPSTORM_META\map;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProductController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('index', 'some');
    $this->middleware('shop.confirm:Product')->only('update', 'destroy');
  }

  public function index() {
    $products = Product::where('shop_id', auth()->user()->shop_id)->orderByDesc('created_at')->get();
    return response(['status' => 'OK', 'products' => ProductResource::collection($products)], 200);
  }

  public function some(Request $request) {

    $products = Product::where('shop_id', auth()->user()->shop_id)
      ->whereIn('id', $request->ids)->get();

    return response(['status' => 'OK', 'products' => ProductResource::collection($products)], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'barcode' => ['required', 'min:1', 'max:255', Rule::unique('products')->where('shop_id', auth()->user()->shop_id)],
      'name' => ['required', 'min:1', 'max:255', Rule::unique('products')->where('shop_id', auth()->user()->shop_id)],
      'category' => 'required|exists:categories,name',
      'description' => 'nullable|max:65535',
      'quantity' => 'required|integer|min:0|max:4294967295',
      'alert_quantity' => 'nullable|integer|min:0|max:16777215',
      'purchase_price' => 'required|numeric|min:0',
      'sale_price' => 'required|numeric|min:0',
      'discount' => 'required|numeric|min:0|max:100',
      'final_sale_price' => 'required|numeric|min:0|lte:sale_price',
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $product = Product::create([
      'shop_id' => auth()->user()->shop_id,
      'barcode' => $request->barcode,
      'name' => $request->name,
      'category_id' => Category::where('name', $request->category)->firstOrFail()->id,
      'description' => $request->description,
      'quantity' => $request->quantity,
      'alert_quantity' => $request->alert_quantity,
      'purchase_price' => $request->purchase_price,
      'sale_price' => $request->sale_price,
      'discount' => $request->discount,
      'final_sale_price' => $request->final_sale_price,
    ]);

    return response(['product' => new ProductResource($product), 'status' => 'OK'], 200);
  }

  public function update(Request $request, $id) {
    $validator = Validator::make($request->all(), [
      'barcode' => ['required', 'min:1', 'max:255', Rule::unique('products')->where('shop_id', auth()->user()->shop_id)->ignore($id)],
      'name' => ['required', 'min:1', 'max:255', Rule::unique('products')->where('shop_id', auth()->user()->shop_id)->ignore($id)],
      'category' => 'required|exists:categories,name',
      'description' => 'nullable|max:65535',
      'quantity' => 'required|integer|min:0|max:4294967295',
      'alert_quantity' => 'nullable|integer|min:0|max:16777215',
      'purchase_price' => 'required|numeric|min:0',
      'sale_price' => 'required|numeric|min:0',
      'discount' => 'required|numeric|min:0|max:100',
      'final_sale_price' => 'required|numeric|min:0|lte:sale_price',
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $product = Product::findOrFail($id);
    $product->update([
      'barcode' => $request->barcode,
      'name' => $request->name,
      'category_id' => Category::where('name', $request->category)->firstOrFail()->id,
      'description' => $request->description,
      'quantity' => $request->quantity,
      'alert_quantity' => $request->alert_quantity,
      'purchase_price' => $request->purchase_price,
      'sale_price' => $request->sale_price,
      'discount' => $request->discount,
      'final_sale_price' => $request->final_sale_price,
    ]);
    return response(['product' => new ProductResource($product->fresh()), 'status' => 'OK'], 200);
  }

  public function destroy($id) {
    // PurchasedProduct::select('purchase_id');

    $product = Product::findOrFail($id);
    $purchases = $product->purchases->map(function ($purchase) {
      return $purchase->id;
    });
    $sales = $product->sales->map(function ($sale) {
      return $sale->id;
    });
    $product->delete();
    return response(['id' => $id, 'status' => 'OK', 'purchases' => $purchases, 'sales' => $sales], 200);
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 400);
  }

  private function error($msg, $statusCode) {
    return response(['error' => ['msg' => $msg], 'status' => 'ERROR'], $statusCode);
  }
}
