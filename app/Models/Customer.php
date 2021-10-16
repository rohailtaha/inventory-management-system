<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'name', 'email', 'phone', 'address'];

  public function requiredFields() {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email ?? '',
      'phone' => $this->phone,
      'address' => $this->address,
    ];
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }
}
