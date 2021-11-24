<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model {
  use HasFactory;

  protected $fillable = ['shop_id', 'name', 'email', 'contact', 'address'];

  public function requiredFields() {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email ?? '',
      'contact' => $this->contact,
      'address' => $this->address,
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }
}
