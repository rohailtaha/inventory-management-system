<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $fillable = [
        'shop_id',
        'name'
    ];

    public function requiredFields() {
        return [
            'id' => $this->id,
            'name' => $this->name,
        ];
    }

    public function products() {
       return $this->hasMany(Product::class);
    }
}
