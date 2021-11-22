<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model {
  use HasFactory;
  protected $fillable = ['shop_id', 'customer_id', 'grand_total', 'payment_received', 'payment_returned', 'net_payment', 'payment_status'];

  protected static function booted() {
    static::deleting(function ($sale) {
      foreach ($sale->products as $soldProduct) {
        $product = Product::find($soldProduct->id);
        $product->quantity += $soldProduct->quantity;
        $product->save();
      }
    });
  }

  public function requiredFields() {
    return [
      'id' => $this->id,
      'customer' => $this->customer->name ?? '',
      'grand_total' => floatval($this->grand_total),
      'payment_received' => floatval($this->payment_received),
      'payment_returned' => floatval($this->payment_returned),
      'net_payment' => floatval($this->net_payment),
      'payment_status' => $this->payment_status,
      'products' => $this->formatProducts($this->products),
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];

  }

  public function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product['id'],
        'name' => $product['name'],
        'per_item_price' => floatval($product['per_item_price']),
        'discount' => floatval($product['discount']),
        'final_sale_price' => floatval($product['final_sale_price']),
        'quantity' => $product['quantity'],
        'total_price' => floatval($product['total_price']),
      ];
    });
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function products() {
    return $this->belongsToMany(Product::class, 'sold_products')->using(SoldProduct::class)
      ->select('products.id', 'products.name', 'sold_products.per_item_price', 'sold_products.discount', 'sold_products.final_sale_price', 'sold_products.quantity', 'sold_products.total_price');
  }

  public function customer() {
    return $this->belongsTo(Customer::class)->select('name');
  }

}
