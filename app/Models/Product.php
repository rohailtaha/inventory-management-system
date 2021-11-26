<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'barcode', 'name', 'category_id', 'description', 'quantity', 'alert_quantity', 'purchase_price', 'sale_price', 'discount', 'final_sale_price'];

  protected $hidden = ['shop_id', 'updated_at'];

  public function purchases() {
    return $this->belongsToMany(Purchase::class, 'purchased_products')->using(PurchasedProduct::class);
  }

  public function sales() {
    return $this->belongsToMany(Purchase::class, 'purchased_products')->using(PurchasedProduct::class);
  }

  public function category() {
    return $this->belongsTo(Category::class);
  }
}
