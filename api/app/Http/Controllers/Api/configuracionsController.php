<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\configuracions;
use Illuminate\Http\Request;

class configuracionsController extends Controller
{
    public function index($id){
        $verCategoria = configuracions::find($id);
        return $verCategoria;
    }

    public function update(Request $request, $id)
    {
        $saveCategorias= configuracions::findOrFail($id);

        $validatedData =    $request->validate([
            'telefono' => 'required',
            'celular1' => 'required',
            'celular2' => 'nullable',
            'correo1' => 'required',
            'correo2' => 'nullable',
            'horario1' => 'required',
            'horario2' => 'required',
            'direccion' => 'required',
            'facebook' => 'nullable',
            'instagram' => 'nullable',
            'twiter' => 'nullable',
            'linkedin' => 'nullable',
            'youtube' => 'nullable',
            'whatsapp' => 'nullable',
        ]);

        $validatedData = array_map(function ($value) {
            return $value === 'null' ? null : $value;
        }, $validatedData);

        $saveCategorias->telefono = $validatedData['telefono'];
        $saveCategorias->celular1 = $validatedData['celular1'];
        $saveCategorias->celular2 = $validatedData['celular2'];
        $saveCategorias->correo1 = $validatedData['correo1'];
        $saveCategorias->correo2 = $validatedData['correo2'];
        $saveCategorias->horario1 = $validatedData['horario1'];
        $saveCategorias->horario2 = $validatedData['horario2'];
        $saveCategorias->direccion = $validatedData['direccion'];

        $saveCategorias->facebook = $validatedData['facebook'];
        $saveCategorias->instagram = $validatedData['instagram'];
        $saveCategorias->twiter = $validatedData['twiter'];
        $saveCategorias->linkedin = $validatedData['linkedin'];
        $saveCategorias->youtube = $validatedData['youtube'];
        $saveCategorias->whatsapp = $validatedData['whatsapp'];

        $result = $saveCategorias->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }
}
