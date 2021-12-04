<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource {

  public function toArray($request) {
    return [
      'id' => $this->id,
      'invoice_id' => $this->invoiceId($this->invoice_id),
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

  private function formatProducts($products) {
    return $products->map(function ($product) {
      return [
        'id' => $product->id,
        'name' => $product->name,
        'per_item_price' => floatval($product->per_item_price),
        'discount' => floatval($product->discount),
        'final_sale_price' => floatval($product->final_sale_price),
        'quantity' => $product->quantity,
        'total_price' => floatval($product->total_price),
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

    return 'S'.$shop_id.'-'.$invoiceNumber;
  }
}
