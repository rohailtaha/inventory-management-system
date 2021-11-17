<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserIsActive {

  public function handle(Request $request, Closure $next) {
    if (auth()->user()->active === 1) {
      return $next($request);
    }
    return response(['error' => ['msg' => 'Your account is blocked by the admin.'], 'status' => 'ERROR'], 403);
  }
}
