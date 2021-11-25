<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CategoryController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('index');
    $this->middleware('shop.confirm:Category')->only('update', 'destroy');
  }

  public function index() {
    $categories = auth()->user()->shop->categories;
    return response(['status' => 'OK', 'categories' => Category::format($categories)], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'name' => ['required', Rule::unique('categories')->where('shop_id', auth()->user()->shop_id)],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $category = Category::create([
      'shop_id' => auth()->user()->shop_id,
      'name' => $request->name,
    ]);

    return response(['category' => Category::formatOne($category), 'status' => 'OK'], 200);
  }

  public function update(Request $request, $id) {

    $validator = Validator::make($request->all(), [
      'name' => ['required', Rule::unique('categories')->where('shop_id', auth()->user()->shop_id)->ignore($id)],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $category = Category::findOrFail($id);

    $products = $category->products;
    $products->transform(function ($product) {
      return $product->id;
    });

    $category->update(['name' => $request->name]);

    return response(['category' => Category::formatOne($category->fresh()), 'products' => $products, 'status' => 'OK'], 200);
  }

  public function destroy($id) {

    return DB::transaction(function () use ($id) {
      $category = Category::findOrFail($id);
      // get purchases for supplier
      $products = $category->products;
      $products->transform(function ($product) {
        return $product->id;
      });
      $category->delete();
      return response(['id' => $id, 'products' => $products, 'status' => 'OK'], 200);
    });
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 200);
  }

}
