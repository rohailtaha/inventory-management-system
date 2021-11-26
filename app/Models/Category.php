<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model {
  use HasFactory;

  protected $table = 'categories';
  protected $fillable = [
    'shop_id',
    'name',
  ];
  protected $hidden = ['updated_at', 'shop_id'];

  public function products() {
    return $this->hasMany(Product::class);
  }

  protected function serializeDate(DateTimeInterface $date) {
    return $date->format('Y-m-d H:i:s');
  }
}
