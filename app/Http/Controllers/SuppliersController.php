<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

class SuppliersController extends Controller
{
        public function index() {
        $suppliers = auth()->user()->shop()->suppliers()->orderByDesc('created_at')->get();
        $suppliers->transform(function($supplier) {
            return $supplier->requiredFields();
        });
        return response(['status'=>'OK', 'suppliers' => $suppliers],  200);
    }

    public function store(Request $request) {
        
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'contact' => ['required'],
            'address' => ['required'],
        ]);

        if($this->invalid($validator))  return $this->errorResponse($validator);
        
        $supplier = Supplier::create([
            'shop_id' => auth()->user()->shop_id,
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
        ]);

        return response(['supplier' => $supplier->requiredFields(), 'status' => 'OK'], 200);
    }

    public function update(Request $request, $id) {
        
        $validator = Validator::make($request->all(), [
            'name' => ['required'],
            'contact' => ['required'],
            'address' => ['required'],
        ]);

        if($this->invalid($validator))  return $this->errorResponse($validator);
        
        Supplier::where([
            'shop_id' => auth()->user()->shop_id,
            'id' => $id,
        ])->update([ 
            'name' => $request->name,
            'contact' => $request->contact,
            'address' => $request->address,
         ]);

        $supplier = Supplier::where(['shop_id' => auth()->user()->shop_id, 'id' => $id])->first();
        return response(['supplier' => $supplier->requiredFields(), 'status' => 'OK'], 200);
    }

    public function delete($id) {
        Supplier::where(['shop_id' => auth()->user()->shop_id, 'id' => $id])->first()->delete();
        return response(['id' => $id],200);
    }

    private function invalid($validator) {
        return $validator->stopOnFirstFailure()->fails();
    }

    private function errorResponse($validator) {
        $errorMsg = Arr::flatten($validator->errors()->messages())[0];
        return response(['error' => ['msg' => $errorMsg], 'status' => 'ERROR'], 200);
    }
}
