<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shop extends Model {
  use HasFactory;

  protected $fillable = ['name', 'contact', 'address'];

  public function users() {
    return $this->hasMany(User::class);
  }

  public function suppliers() {
    return $this->hasMany(Supplier::class)->orderByDesc('created_at');
  }

  public function customers() {
    return $this->hasMany(Customer::class)->orderByDesc('created_at');
  }

  public function purchases() {
    return $this->hasMany(Purchase::class)->orderByDesc('created_at');
  }
}
