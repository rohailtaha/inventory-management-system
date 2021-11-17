<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureUserIsActive {

  public function handle(Request $request, Closure $next) {

    if (auth()->user()->active === 1) {
      return $next($request);
    }
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return $this->errorResponse();
  }

  private function errorResponse() {
    return response(['error' => ['msg' => 'Your account is blocked by the admin.'], 'status' => 'ERROR'], 403);
  }
}
