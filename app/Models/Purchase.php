<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'purchase_status', 'grand_total', 'amount_paid', 'payment_status', 'supplier_id'];

  protected $hidden = ['shop_id', 'updated_at'];

  protected static function booted() {
    static::deleting(function ($purchase) {
      if ($purchase->purchase_status === 'Received') {
        foreach ($purchase->products as $purchasedProduct) {
          $product = Product::find($purchasedProduct->id);
          $product->quantity -= $purchasedProduct->quantity;
          $product->save();
        }
      }
    });
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function products() {
    return $this->belongsToMany(Product::class, 'purchased_products')->using(PurchasedProduct::class)
      ->select('products.id', 'products.name', 'purchased_products.quantity', 'purchased_products.per_item_cost', 'purchased_products.total_cost');
  }

  public function supplier() {
    return $this->belongsTo(Supplier::class);
  }

}
