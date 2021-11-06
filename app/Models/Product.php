<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'barcode', 'name', 'category_id', 'description', 'quantity', 'alert_quantity', 'purchase_price', 'sale_price', 'discount', 'final_sale_price'];

  public function requiredFields() {
    return [
      'id' => $this->id,
      'barcode' => $this->barcode,
      'name' => $this->name,
      'category' => $this->category->name ?? 'Deleted',
      'description' => $this->description ?? '',
      'quantity' => $this->quantity,
      'alert_quantity' => $this->alert_quantity,
      'purchase_price' => $this->purchase_price,
      'sale_price' => $this->sale_price,
      'discount' => $this->discount,
      'final_sale_price' => $this->final_sale_price,
    ];
  }

  public function category() {
    return $this->belongsTo(Category::class);
  }
}
