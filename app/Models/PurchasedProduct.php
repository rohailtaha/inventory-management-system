<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PurchasedProduct extends Pivot {
  use HasFactory;

  protected $table = 'purchased_products';

  protected $hidden = ['purchase_id', 'product_id'];

  public $incrementing = true;
  public $timestamps = false;

  protected static function booted() {
    static::created(function ($purchasedProduct) {
      $purchase = Purchase::find($purchasedProduct->purchase_id);
      if ($purchase->purchase_status === 'Received') {
        $product = Product::find($purchasedProduct->product_id);
        $product->quantity += $purchasedProduct->quantity;
        $product->save();
      }
    });

    static::deleting(function ($purchasedProduct) {
      $purchase = Purchase::find($purchasedProduct->purchase_id);
      if ($purchase->purchase_status === 'Received') {
        $product = Product::find($purchasedProduct->product_id);
        $product->quantity -= $purchasedProduct->quantity;
        $product->save();
      }
    });
  }
}
