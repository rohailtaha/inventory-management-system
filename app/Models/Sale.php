<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model {
  use HasFactory;
  protected $fillable = ['shop_id', 'customer_id', 'grand_total', 'payment_received', 'payment_returned', 'net_payment', 'payment_status'];

  public function requiredFields() {
    return [
      'date' => $this->created_at->format('d/m/y'),
      'id' => $this->id,
      'customer' => $this->customer->name ?? '',
      'grand_total' => floatval($this->grand_total),
      'payment_received' => floatval($this->payment_received),
      'payment_returned' => floatval($this->payment_returned),
      'net_payment' => floatval($this->net_payment),
      'payment_status' => $this->payment_status,
      'products' => $this->formatProducts($this->products),
    ];

  }

  public function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product['id'],
        'name' => $product['name'],
        'sale_price' => floatval($product['sale_price']),
        'discount' => floatval($product['discount']),
        'discounted_sale_price' => floatval($product['discounted_sale_price']),
        'quantity' => $product['quantity'],
        'net_total' => floatval($product['net_total']),
      ];
    });
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function products() {
    return $this->belongsToMany(Product::class, 'sold_products')->using(SoldProduct::class)
      ->select('products.id', 'products.name', 'sold_products.sale_price', 'sold_products.discount', 'sold_products.discounted_sale_price', 'sold_products.quantity', 'sold_products.net_total');
  }

  public function customer() {
    return $this->belongsTo(Customer::class)->select('name');
  }

}
