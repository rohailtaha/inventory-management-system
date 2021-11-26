<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Facades\DB;

class SoldProduct extends Pivot {
  use HasFactory;

  protected $table = 'sold_products';

  protected $hidden = ['sale_id', 'product_id'];

  public $incrementing = true;
  public $timestamps = false;

  public $afterCommit = true;

  protected static function booted() {
    static::created(function ($soldProduct) {
      $product = Product::findOrFail($soldProduct->product_id);
      $product->quantity -= $soldProduct->quantity;
      $product->save();
    });

    static::deleting(function ($soldProduct) {
      if ($soldProduct->product_id) {
        $product = Product::findOrFail($soldProduct->product_id);
        $product->quantity += $soldProduct->quantity;
        $product->save();
      }
    });
  }

  protected static function highestSales() {
    return SoldProduct::join('products', 'sold_products.product_id', '=', 'products.id')
      ->join('sales', 'sold_products.sale_id', '=', 'sales.id')
      ->select(DB::raw('sold_products.product_id as id'), 'products.name', DB::raw('sum(sold_products.quantity) as total_sales'), DB::raw('sum(sold_products.total_price) as income'))
      ->whereNotNull('product_id')
      ->where('sales.shop_id', auth()->user()->shop_id)
      ->orderBy('total_sales', 'desc')
      ->orderBy('income', 'desc')
      ->groupBy('product_id')
      ->limit(3)
      ->get();
  }
}
