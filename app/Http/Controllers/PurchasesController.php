<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use App\Models\PurchasedProduct;
use App\Rules\CorrectTotalCostForProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PurchasesController extends Controller {

  private $purchaseStatus = ['Received', 'Pending'];
  private $paymentStatus = ['Paid', 'Unpaid', 'Partial'];

  public function index() {

    $purchases = auth()->user()->shop->purchases;

    $purchases->transform(function ($purchase) {
      return $purchase->requiredFields();
    });

    return response(['status' => 'OK', 'purchases' => $purchases], 200);
  }

  public function store(Request $request) {
    $validator = Validator::make($request->all(), [
      'products' => ['required', new CorrectTotalCostForProducts],
      'products.*.id' => ['required', 'numeric', 'integer', 'min:0', Rule::exists('products', 'id')
          ->where('shop_id', auth()->user()->shop_id)],
      'products.*.per_item_cost' => 'required|numeric|min:0|lte:products.*.total_cost',
      'products.*.quantity' => 'required|numeric|integer|min:0',
      'products.*.total_cost' => 'required|numeric|min:0',
      'supplier_id' => ['required', 'integer', 'min:0', Rule::exists('suppliers', 'id')
          ->where('shop_id', auth()->user()->shop_id)],
      'purchase_status' => ['required', Rule::in($this->purchaseStatus)],
      'payment_status' => ['required', Rule::in($this->paymentStatus)],
      'amount_paid' => 'required|numeric|min:0',
      'grand_total' => 'required|numeric|min:0',
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $purchase = Purchase::create(array_merge(
      ['shop_id' => 1],
      $request->only('purchase_status', 'grand_total', 'amount_paid', 'payment_status', 'supplier_id')
    ));

    foreach ($request->products as $product) {
      PurchasedProduct::create([
        'purchase_id' => $purchase['id'],
        'product_id' => $product['id'],
        'quantity' => $product['quantity'],
        'per_item_cost' => $product['per_item_cost'],
        'total_cost' => $product['total_cost'],
      ]);
    }

    return response(
      ['purchase' => $purchase->requiredFields(), 'status' => 'OK'],
      200
    );
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(
      ['error' => ['msg' => $errorMsg], 'status' => 'ERROR'],
      200
    );
  }

}
