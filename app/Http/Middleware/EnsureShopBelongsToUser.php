<?php

namespace App\Http\Middleware;

use App\Models\Category;
use App\Models\Customer;
use App\Models\Product;
use App\Models\Purchase;
use App\Models\Sale;
use App\Models\Supplier;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class EnsureShopBelongsToUser {

  public function handle(Request $request, Closure $next, $modelName) {

    switch ($modelName) {
      case 'User':
        $record = User::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Product':
        $record = Product::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Category':
        $record = Category::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Supplier':
        $record = Supplier::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Customer':
        $record = Customer::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Purchase':
        $record = Purchase::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

      case 'Sale':
        $record = Sale::where(['shop_id' => auth()->user()->shop_id, 'id' => $request->route()->id])->first();
        if ($record) {
          return $next($request);
        }
        break;

    }

    return response(['error' => ['msg' => 'You are not authorized to perform this action.'], 'status' => 'ERROR'], 403);
  }
}
