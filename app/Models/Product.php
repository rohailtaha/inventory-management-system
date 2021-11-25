<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'barcode', 'name', 'category_id', 'description', 'quantity', 'alert_quantity', 'purchase_price', 'sale_price', 'discount', 'final_sale_price'];

  private function requiredFields() {
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
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : ''];
  }

  public static function format($models) {
    return $models->map(function ($model) {
      return $model->requiredFields();
    });
  }

  public static function formatOne($model) {
    return $model->requiredFields();
  }

  public function category() {
    return $this->belongsTo(Category::class);
  }
}
