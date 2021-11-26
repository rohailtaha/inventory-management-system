<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'name', 'email', 'phone', 'address'];
  protected $hidden = ['updated_at', 'shop_id'];

  public function sales() {
    return $this->hasMany(Sale::class);
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }
}
