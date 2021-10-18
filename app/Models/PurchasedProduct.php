<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class PurchasedProduct extends Pivot {
  use HasFactory;

  protected $hidden = ['purchase_id', 'product_id'];

  public $incrementing = true;
  public $timestamps = false;
}
