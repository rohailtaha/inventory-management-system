<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class EnsureUserIsAdmin {

  public function handle(Request $request, Closure $next) {
    if (auth()->user()->roles[0]->name === 'ADMIN') {
      return $next($request);
    }

    return response(['error' => ['msg' => 'You are not authorized to perform this action.'], 'status' => 'ERROR'], 200);
  }
}
