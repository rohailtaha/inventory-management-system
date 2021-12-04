<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseResource;
use App\Models\Purchase;
use App\Models\PurchasedProduct;
use App\Rules\CorrectTotalCostForProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PurchaseController extends Controller {

  private $purchaseStatus = ['Received', 'Pending'];
  private $paymentStatus = ['Paid', 'Unpaid', 'Partial'];

  public function __construct() {
    $this->middleware('shop.confirm:Purchase')->only('update', 'destroy');
  }

  public function index() {
    $purchases = auth()->user()->shop->purchases;
    return response(['status' => 'OK', 'purchases' => PurchaseResource::collection($purchases)], 200);
  }

  public function some(Request $request) {
    $purchases = Purchase::where('shop_id', auth()->user()->shop_id)
      ->whereIn('id', $request->ids)->get();

    return response(['status' => 'OK', 'purchases' => PurchaseResource::collection($purchases)], 200);
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

    return DB::transaction(function () use ($request) {
      $purchase = Purchase::create([
        'shop_id' => auth()->user()->shop_id,
        'invoice_id' => Purchase::maxInvoiceId() + 1,
        'purchase_status' => $request->purchase_status,
        'grand_total' => $request->grand_total,
        'amount_paid' => $request->amount_paid,
        'payment_status' => $request->payment_status,
        'supplier_id' => $request->supplier_id,
      ]);

      foreach ($request->products as $product) {
        PurchasedProduct::create([
          'purchase_id' => $purchase->id,
          'product_id' => $product['id'],
          'quantity' => $product['quantity'],
          'per_item_cost' => $product['per_item_cost'],
          'total_cost' => $product['total_cost'],
        ]);
      }

      return response(['purchase' => new PurchaseResource($purchase), 'status' => 'OK'], 200);
    });

  }

  public function update(Request $request, $id) {

    $validator = Validator::make($request->all(), [
      'products' => ['required', new CorrectTotalCostForProducts],
      'products.*.id' => ['required', 'numeric', 'integer', 'min:0', Rule::exists('products', 'id')
          ->where('shop_id', auth()->user()->shop_id)],
      'products.*.per_item_cost' => 'required|numeric|min:0|lte:products.*.total_cost',
      'products.*.quantity' => 'required|numeric|integer|min:1',
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

    return DB::transaction(function () use ($request, $id) {
      $purchase = Purchase::findOrFail($id);
      $updatedProducts = [];
      // delete products for old purchase
      PurchasedProduct::where('purchase_id', $id)->get()->each(function ($row) use (&$updatedProducts) {
        $updatedProducts[] = $row->product_id;
        $row->delete();
      });

      // update purchase
      $purchase->update(
        array_merge(
          ['shop_id' => auth()->user()->shop_id],
          $request->only('purchase_status', 'grand_total', 'amount_paid', 'payment_status', 'supplier_id')
        ));

      // add products for new purchase
      foreach ($request->products as $product) {
        $updatedProducts[] = $product['id'];
        PurchasedProduct::create([
          'purchase_id' => $id,
          'product_id' => $product['id'],
          'quantity' => $product['quantity'],
          'per_item_cost' => $product['per_item_cost'],
          'total_cost' => $product['total_cost'],
        ]);
      }

      return response([
        'purchase' => new PurchaseResource($purchase->fresh()),
        'products' => array_unique($updatedProducts), 'status' => 'OK',
      ], 200);
    });
  }

  public function destroy($id) {
    $purchase = Purchase::findOrFail($id);
    $products = $purchase->products->map(function ($product) {
      return $product->id;
    });
    $purchase->delete();
    return response(['id' => $id, 'products' => $products, 'status' => 'OK'], 200);
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(
      ['error' => ['msg' => $errorMsg], 'status' => 'ERROR'],
      400
    );
  }

}
