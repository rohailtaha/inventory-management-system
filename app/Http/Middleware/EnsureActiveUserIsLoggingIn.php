<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class EnsureActiveUserIsLoggingIn {

  private function errorResponse() {
    return response(['error' => ['msg' => 'Your account is blocked by the admin.'], 'status' => 'ERROR'], 403);
  }

  public function handle(Request $request, Closure $next) {
    $user = User::where(['email' => $request->email])->first();
    if ($user) {
      return $user->active === 1 ? $next($request) : $this->errorResponse();
    }
    $next($request);
  }
}
