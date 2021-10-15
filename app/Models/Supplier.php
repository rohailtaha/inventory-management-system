<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['shop_id', 'name', 'contact', 'address'];
    
    public function requiredFields() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'contact' => $this->contact,
            'address' => $this->address,
        ];
    }

    public function shop() {
        return $this->belongsTo(Shop::class);
    }
}
