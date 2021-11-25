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
  ];

  /**
   * The attributes that should be cast.
   *
   * @var array
   */
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

  private function requiredFields() {
    return [
      'id' => $this->id,
      'name' => $this->name,
      'email' => $this->email,
      'phone' => $this->phone,
      'status' => $this->active === 1 ? 'Active' : 'Blocked',
      'role' => $this->roles[0]->name ?? 'None',
      'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : '',
    ];
  }

  public static function format($models) {
    return $models->map(function ($model) {
      return $model->requiredFields();
    });
  }

  public static function formatOne($model) {
    return $model->requiredFields();
  }

  public function roles() {
    return $this->belongsToMany(Role::class);
  }

  public function shop() {
    return $this->belongsTo(Shop::class);
  }

}
