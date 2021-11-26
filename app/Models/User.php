<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable {
  use HasApiTokens, HasFactory, Notifiable;

  protected $fillable = [
    'name',
    'shop_id',
    'username',
    'password',
    'email',
    'phone',
    'active',
  ];

  protected $hidden = [
    'password',
    'remember_token',
    'shop_id',
    'updated_at',
  ];

  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  public function isAdmin() {
    foreach ($this->roles as $role) {
      if (strcasecmp($role->name, 'ADMIN') == 0) {
        return true;
      }

    }
    return false;
  }

  public function roles() {
    return $this->belongsToMany(Role::class);
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

}
