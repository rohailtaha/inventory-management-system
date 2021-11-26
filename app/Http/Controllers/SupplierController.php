<?php

namespace App\Http\Controllers;

use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class SupplierController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('index');
    $this->middleware('shop.confirm:Supplier')->only('update', 'destroy');
  }

  public function index() {

    $suppliers = auth()->user()->shop->suppliers;

    return response(['status' => 'OK', 'suppliers' => SupplierResource::collection($suppliers)], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'name' => ['required', 'max:255', Rule::unique('suppliers')->where(
        'shop_id',
        auth()->user()->shop_id
      )],
      'contact' => [
        'required',
        'min:4',
        'max:20',
        Rule::unique('suppliers')->where(
          'shop_id',
          auth()->user()->shop_id
        ),
      ],
      'email' => [
        'nullable',
        'max:255',
        Rule::unique('suppliers')->where(
          'shop_id',
          auth()->user()->shop_id
        ),
      ],
      'address' => ['required', 'max:255'],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $supplier = Supplier::create(
      array_merge(
        ['shop_id' => auth()->user()->shop_id],
        $request->only('name', 'email', 'contact', 'address')
      )
    );

    return response(
      ['supplier' => new SupplierResource($supplier), 'status' => 'OK'],
      200
    );
  }

  public function update(Request $request, $id) {
    $validator = Validator::make($request->all(), [
      'name' => [
        'required',
        'max:255',
        Rule::unique('suppliers')
          ->where('shop_id', auth()->user()->shop_id)
          ->ignore($id),
      ],
      'contact' => [
        'required', 'min:4', 'max:20', Rule::unique('suppliers')->where('shop_id', auth()->user()->shop_id)->ignore($id),
      ],
      'email' => [
        'nullable',
        'max:255',
        Rule::unique('suppliers')
          ->where('shop_id', auth()->user()->shop_id)
          ->ignore($id),
      ],
      'address' => ['required', 'max:255'],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $supplier = Supplier::findOrFail($id);
    $supplier->update($request->only('name', 'email', 'contact', 'address'));

    return response(['supplier' => new SupplierResource($supplier->fresh()), 'status' => 'OK'], 200);
  }

  public function destroy($id) {
    $supplier = Supplier::findOrFail($id);
    $purchases = $supplier->purchases->transform(function ($purchase) {
      return $purchase->id;
    });
    $supplier->delete();
    return response(['id' => $id, 'purchases' => $purchases, 'status' => 'OK'], 200);
  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 400);
  }
}
