<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SoldProduct extends Pivot {
  use HasFactory;

  protected $table = 'sold_products';

  protected $hidden = ['sale_id', 'product_id'];

  public $incrementing = true;
  public $timestamps = false;

  public $afterCommit = true;

  protected static function booted() {
    static::created(function ($soldProduct) {
      $product = Product::find($soldProduct->product_id);
      $product->quantity -= $soldProduct->quantity;
      $product->save();
    });

    static::deleting(function ($soldProduct) {
      $product = Product::find($soldProduct->product_id);
      $product->quantity += $soldProduct->quantity;
      $product->save();
    });
  }
}
