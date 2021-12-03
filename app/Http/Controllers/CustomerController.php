<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerResource;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CustomerController extends Controller {

  public function __construct() {
    $this->middleware('admin')->except('index');
    $this->middleware('shop.confirm:Customer')->only('update', 'destroy');
  }

  public function index() {

    $customers = auth()->user()->shop->customers;
    return response(['status' => 'OK', 'customers' => CustomerResource::collection($customers)], 200);
  }

  public function store(Request $request) {

    $validator = Validator::make($request->all(), [
      'name' => ['required', 'max:255', Rule::unique('customers')->where(
        'shop_id', auth()->user()->shop_id
      )],
      'email' => ['nullable', 'max:255', Rule::unique('customers')->where(
        'shop_id', auth()->user()->shop_id
      ),
      ],
      'phone' => ['required', 'min:4', 'max:20', Rule::unique('customers')->where(
        'shop_id', auth()->user()->shop_id
      ),
      ],
      'address' => ['required', 'max:255'],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $customer = Customer::create(
      array_merge(
        ['shop_id' => auth()->user()->shop_id],
        $request->only('name', 'email', 'phone', 'address')
      )
    );

    return response(['customer' => new CustomerResource($customer), 'status' => 'OK'], 200);
  }

  public function update(Request $request, $id) {
    $validator = Validator::make($request->all(), [
      'name' => [
        'required',
        'max:255',
        Rule::unique('customers')
          ->where('shop_id', auth()->user()->shop_id)
          ->ignore($id),
      ],
      'phone' => [
        'required', 'min:4', 'max:20', Rule::unique('customers')->where('shop_id', auth()->user()->shop_id)->ignore($id),
      ],
      'email' => [
        'nullable',
        'max:255',
        Rule::unique('customers')
          ->where('shop_id', auth()->user()->shop_id)
          ->ignore($id),
      ],
      'address' => ['required', 'max:255'],
    ]);

    if ($this->invalid($validator)) {
      return $this->errorResponse($validator);
    }

    $customer = Customer::find($id);
    $customer->update($request->only('name', 'email', 'phone', 'address'));

    return response(['customer' => new CustomerResource($customer->fresh()), 'status' => 'OK'], 200);
  }

  public function destroy($id) {
    $customer = Customer::findOrFail($id);
    $sales = $customer->sales->transform(function ($sale) {
      return $sale->id;
    });
    $customer->delete();
    return response(['id' => $id, 'sales' => $sales, 'status' => 'OK'], 200);

  }

  private function invalid($validator) {
    return $validator->stopOnFirstFailure()->fails();
  }

  private function errorResponse($validator) {
    $errorMsg = Arr::flatten($validator->errors()->messages())[0];
    return response([
      'error' => ['msg' => $errorMsg],
      'status' => 'ERROR'],
      400
    );
  }
}
