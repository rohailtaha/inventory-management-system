<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource {

  public function toArray($request) {
    return [
      'id' => $this->id,
      'invoice_id' => $this->invoiceId($this->invoice_id),
      'purchase_status' => $this->purchase_status,
      'grand_total' => floatval($this->grand_total),
      'amount_paid' => floatval($this->amount_paid),
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
        'per_item_cost' => floatval($product->per_item_cost),
        'total_cost' => floatval($product->total_cost),
      ];
    });
  }

  private function invoiceId($invoiceNumber) {
    $shop_id = strval(auth()->user()->shop_id);
    // get padded shop_id
    if (strlen($shop_id) <= 1) {
      $shop_id = str_pad($shop_id, 2, '0', STR_PAD_LEFT);
    }

    // get padded invoice number
    if (strlen(strval($invoiceNumber)) <= 4) {
      $invoiceNumber = str_pad(strval($invoiceNumber), 4, '0', STR_PAD_LEFT);
    }

    return 'P'.$shop_id.'-'.$invoiceNumber;
  }
}
