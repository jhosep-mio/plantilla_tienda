<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\categorias;
use Illuminate\Http\Request;

class categoriasController extends Controller
{
    public function index(){
        $categorias = categorias::orderBy('categorias.id', 'asc')->get();
        return $categorias;
    }

    private function quitarAcentos($cadena)
    {
        $acentos = array(
            'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú',
            'à', 'è', 'ì', 'ò', 'ù', 'À', 'È', 'Ì', 'Ò', 'Ù',
            'ä', 'ë', 'ï', 'ö', 'ü', 'Ä', 'Ë', 'Ï', 'Ö', 'Ü',
            'â', 'ê', 'î', 'ô', 'û', 'Â', 'Ê', 'Î', 'Ô', 'Û',
            'ã', 'õ', 'ñ', 'ç', 'Ã', 'Õ', 'Ñ', 'Ç'
        );

        $sinAcentos = array(
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U',
            'a', 'o', 'n', 'c', 'A', 'O', 'N', 'C'
        );

        $cadenaSinAcentos = str_replace($acentos, $sinAcentos, $cadena);

        return $cadenaSinAcentos;
    }

    public function buscar(Request $request) {
        $search = '%' . $this->quitarAcentos($request->buscar) . '%';
        $resultados = categorias::where('imagen1', 'LIKE', $search)
                            ->orWhere('nombre', 'LIKE', $search)
                                ->orderBy('id', 'desc')
                                ->get();
        return response()->json($resultados);
    }

    public function store(Request $request){
        $saveCategorias = new categorias();

        $request->validate([
            'nombre'=>'required|string',
            'imagen1' =>'required',
        ]);

        $saveCategorias->nombre = $request->nombre;

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $pictureImagen1 = date('His').'-'.$name_File;
            $file->move(public_path('categorias/'),$pictureImagen1);
        }  

        $saveCategorias->imagen1 = $pictureImagen1;
        
        $result = $saveCategorias->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }
    
    public function show($id){
        $verCategoria = categorias::find($id);
        return $verCategoria;
    }

    public function update(Request $request, $id){
        $updateCategoria= categorias::findOrFail($id);

         $request->validate([
            'nombre'=>'required|string',
        ]);

        if($request->hasFile('imagen1')){
            $file = $request->file('imagen1');
            $filename = $file->getClientOriginalName(); 
            $name_File=str_replace(" ","_", $filename);
            
            $picture1 = date('His').'-'.$name_File;
            $file->move(public_path('categorias/'),$picture1);
            $updateCategoria->imagen1 = $picture1;

            $producto = categorias::find($id);
            if ($producto->imagen1 && file_exists(public_path('categorias/' . $producto->imagen1))) {
                unlink(public_path('categorias/'.$producto -> imagen1));
            }

        }else {
            $verProducto = categorias::find($id);
            $picture1 = $verProducto['imagen1'];
        }


        $updateCategoria->nombre = $request->nombre;

        $result =$updateCategoria->save();

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }
    }

    public function destroy($id){
        $producto =  categorias::find($id);
        
        if ($producto->imagen1 && file_exists(public_path('categorias/' . $producto->imagen1))) {
            unlink(public_path('categorias/' . $producto->imagen1));
        }

        $result = categorias::destroy($id);

        if($result){
            return response()->json(['status'=>"success"]);
        }else {
            return response()->json(['status'=>"error"]);
        }

    }
}
