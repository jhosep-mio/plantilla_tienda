<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{

    public function handle(Request $request, Closure $next, $rol1)
    {
        $user = auth()->user();
        if (!$user || $user->id_rol != $rol1) {
            return response()->json(['error' => 'Acceso no autorizado'], 403);
        }
        return $next($request);
    }
}
