<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource {

  public function toArray($request) {
    return [
      'id' => $this->id,
      'customer' => $this->customer->name ?? '',
      'grand_total' => $this->grand_total,
      'payment_received' => $this->payment_received,
      'payment_returned' => $this->payment_returned,
      'net_payment' => $this->net_payment,
      'payment_status' => $this->payment_status,
      'products' => $this->formatProducts($this->products),
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }

  private function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product->id,
        'name' => $product->name,
        'per_item_price' => $product->per_item_price,
        'discount' => $product->discount,
        'final_sale_price' => $product->final_sale_price,
        'quantity' => $product->quantity,
        'total_price' => $product->total_price,
      ];
    });
  }
}
