<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'name', 'email', 'contact', 'address'];
  protected $hidden = ['updated_at', 'shop_id'];

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

  public function purchases() {
    return $this->hasMany(Purchase::class);
  }
}
