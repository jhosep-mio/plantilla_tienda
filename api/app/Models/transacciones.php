<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class transacciones extends Model
{
    use HasFactory;
    protected $fillable = [
        'id_transaccion',
        'nombres',
        'apellidos',
        'email',
        'celular',
    ];
}
