<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\SoldProduct;
use App\Rules\CorrectTotalPriceForProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SalesController extends Controller {
  private $paymentStatus = ['Paid', 'Unpaid', 'Partial'];

  public function index() {

    $sales = auth()->user()->shop->sales;

    $sales->transform(function ($sale) {
      return $sale->requiredFields();
    });

    return response(['status' => 'OK', 'sales' => $sales], 200);
  }

  public function store(Request $request) {
    $validator = Validator::make($request->all(), [
      'products' => ['required', new CorrectTotalPriceForProducts],
      'products.*.id' => ['required', 'numeric', 'integer', 'min:0', Rule::exists('products', 'id')
          ->where('shop_id', auth()->user()->shop_id)],
      'products.*.per_item_price' => 'required|numeric|min:0',
      'products.*.discount' => 'required|numeric|min:0',
      'products.*.final_sale_price' => 'required|numeric|min:0|lte:products.*.per_item_price|lte:products.*.total_price',
      'products.*.quantity' => 'required|numeric|integer|min:1',
      'products.*.total_price' => 'required|numeric|min:0',
      'customer_id' => ['required', 'integer', 'min:0', Rule::exists('customers', 'id')
          ->where('shop_id', auth()->user()->shop_id)],
      'grand_total' => 'required|numeric|min:0',
      'payment_received' => 'required|numeric|min:0',
      'payment_retured' => 'required|numeric|min:0',
      // Validate That "net_payment" Is Correct
      'net_payment' => 'required|numeric|min:0',
      'payment_status' => ['required', Rule::in($this->paymentStatus)],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $sale = Sale::create(array_merge(
      ['shop_id' => auth()->user()->shop_id],
      $request->only('customer_id', 'grand_total', 'payment_received', 'payment_returned', 'net_payment', 'payment_status')
    ));

    foreach ($request->products as $product) {
      SoldProduct::create([
        'sale_id' => $sale['id'],
        'product_id' => $product['id'],
        'per_item_price' => $product['per_item_price'],
        'discount' => $product['discount'],
        'discounted_sale_price' => $product['final_sale_price'],
        'quantity' => $product['quantity'],
        'total_price' => $product['total_price'],
      ]);
    }

    return response(
      ['sale' => $sale->requiredFields(), 'status' => 'OK'],
      200
    );
  }

}
