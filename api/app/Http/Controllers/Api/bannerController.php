<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\banner;
use Illuminate\Http\Request;

class bannerController extends Controller
{
   
    public function index(){
        $categorias = banner::orderBy('banners.id', 'asc')->get();
        return $categorias;
    }

    public function buscar(Request $request) {
        $resultados = banner::where('imagen1', 'LIKE', '%' . $request->buscar . '%')
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }

    public function show($id){
        $verProducto = banner::find($id);
        return $verProducto;
    }

    public function store(Request $request)
    {
        $saveproducto = new banner();

        $request->validate([
            'imagen1' =>'required',
            'titulo' =>'required',
            'subtitulo' =>'required',
        ]);

        $saveproducto->titulo = $request->titulo;
        $saveproducto->subtitulo = $request->subtitulo;

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('banner/'),$pictureImagen1);
        }  

        $saveproducto->imagen1 = $pictureImagen1;
        $result = $saveproducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function update(Request $request, $id)
    {
        $updateProducto= banner::findOrFail($id);

        $request->validate([
            'titulo' =>'required',
            'subtitulo' =>'required',
        ]);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('banner/'),$picture1);
            $updateProducto->imagen1 = $picture1;

            $producto = banner::find($id);
            if ($producto->imagen1 && file_exists(public_path('banner/' . $producto->imagen1))) {
                unlink(public_path('banner/'.$producto -> imagen1));
            }

        }else {
            $verProducto = banner::find($id);
            $picture1 = $verProducto['imagen1'];
        }
        
        $updateProducto->titulo = $request->titulo;
        $updateProducto->subtitulo = $request->subtitulo;

        $updateProducto->imagen1 = $picture1;

        $result =$updateProducto->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function destroy($id){
        $producto =  banner::find($id);

        if ($producto->imagen1 && file_exists(public_path('banner/' . $producto->imagen1))) {
            unlink(public_path('banner/' . $producto->imagen1));
        }

        $result = banner::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
}
