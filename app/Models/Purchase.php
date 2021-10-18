<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Purchase extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'purchase_status', 'grand_total', 'amount_paid', 'payment_status', 'supplier_id'];

  public function requiredFields() {
    return [
      'date' => $this->created_at->format('d/m/y'),
      'id' => $this->id,
      'purchase_status' => $this->purchase_status,
      'grand_total' => $this->grand_total,
      'amount_paid' => $this->amount_paid,
      'payment_status' => $this->payment_status,
      'supplier' => $this->supplier->name,
      'products' => $this->products,
    ];

  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function products() {
    return $this->belongsToMany(Product::class, 'purchased_products')->using(PurchasedProduct::class)
      ->as('purchase')
      ->select('products.id', 'products.name')
      ->withPivot('quantity', 'per_item_cost', 'total_cost');
  }

  public function supplier() {
    return $this->belongsTo(Supplier::class)->select('name');
  }

}
