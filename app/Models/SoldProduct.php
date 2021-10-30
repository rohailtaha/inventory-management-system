<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class SoldProduct extends Pivot {
  use HasFactory;

  protected $table = 'sold_products';

  protected $hidden = ['sale_id', 'product_id'];

  public $incrementing = true;
  public $timestamps = false;

}
