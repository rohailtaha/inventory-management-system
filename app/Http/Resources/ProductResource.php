<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource {
  public function toArray($request) {
    return [
      'id' => $this->id,
      'barcode' => $this->barcode,
      'name' => $this->name,
      'category' => $this->category->name ?? '',
      'description' => $this->description ?? '',
      'quantity' => intval($this->quantity),
      'alert_quantity' => intval($this->alert_quantity),
      'purchase_price' => floatval($this->purchase_price),
      'sale_price' => floatval($this->sale_price),
      'discount' => floatval($this->discount),
      'final_sale_price' => floatval($this->final_sale_price),
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }
}
