<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model {
  use HasFactory;
  protected $fillable = ['shop_id', 'invoice_id', 'customer_id', 'grand_total', 'payment_received', 'payment_returned', 'net_payment', 'payment_status'];

  protected $hidden = ['shop_id', 'updated_at'];

  protected static function booted() {
    static::deleting(function ($sale) {
      foreach ($sale->products as $soldProduct) {
        $product = Product::find($soldProduct->id);
        $product->quantity += $soldProduct->quantity;
        $product->save();
      }
    });
  }

  public static function maxInvoiceId() {
    if (Sale::where('shop_id', auth()->user()->shop_id)->count()) {
      return Sale::where('shop_id', auth()->user()->shop_id)->max('invoice_id');
    }
    return 0;
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function products() {
    return $this->belongsToMany(Product::class, 'sold_products')->using(SoldProduct::class)
      ->select('products.id', 'products.name', 'sold_products.per_item_price', 'sold_products.discount', 'sold_products.final_sale_price', 'sold_products.quantity', 'sold_products.total_price');
  }

  public function customer() {
    return $this->belongsTo(Customer::class);
  }

}
