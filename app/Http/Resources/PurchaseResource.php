<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource {

  public function toArray($request) {
    return [
      'id' => $this->id,
      'purchase_status' => $this->purchase_status,
      'grand_total' => $this->grand_total,
      'amount_paid' => $this->amount_paid,
      'payment_status' => $this->payment_status,
      'supplier' => $this->supplier->name ?? '',
      'products' => $this->formatProducts($this->products),
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }

  private function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product->id,
        'name' => $product->name,
        'quantity' => $product->quantity,
        'per_item_cost' => $product->per_item_cost,
        'total_cost' => $product->total_cost,
      ];
    });
  }
}
