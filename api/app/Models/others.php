<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class others extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_categoria', 
        'nombre', 
        'imagen1', 
        'imagen2', 
        'imagen3', 
        'caracteristicas', 
        'precio', 
    ];
}
