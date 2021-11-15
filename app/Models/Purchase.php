<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'purchase_status', 'grand_total', 'amount_paid', 'payment_status', 'supplier_id'];

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

  public function requiredFields() {
    return [
      'date' => $this->created_at->format('Y-m-d'),
      'id' => $this->id,
      'purchase_status' => $this->purchase_status,
      'grand_total' => floatval($this->grand_total),
      'amount_paid' => floatval($this->amount_paid),
      'payment_status' => $this->payment_status,
      'supplier' => $this->supplier->name ?? '',
      'products' => $this->formatProducts($this->products),
    ];

  }

  public function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product['id'],
        'name' => $product['name'],
        'quantity' => $product['quantity'],
        'per_item_cost' => floatval($product['per_item_cost']),
        'total_cost' => floatval($product['total_cost']),
      ];
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
    return $this->belongsTo(Supplier::class)->select('name');
  }

}
