<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\pacientes;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Hash;


class userController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name' => 'required',
            'id_rol' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->id_rol = $request->id_rol;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);

        $user->save();

        if($user){
            return response()->json([
                "status" => "success",
                "message" => "Registrado Correctamente"
            ]);
        }else{
            return response()->json([
                "status" => "error",
                "message" => "Error"
            ]);
        }
    }

    public function login(Request $request) {
        $request->validate([
            "email" => "required|email",
            "password" => "required"
        ]);

        $user = User::where("email", "=", $request->email)->first();

        if(isset($user->id)){
            if(Hash::check($request->password, $user->password)){
                //CREAMOS EL TOKEN
               $token = $user->createToken("auth_token")->plainTextToken;
               if($user->id_rol == 99){
                   return response()->json([
                        "status" => "success",
                        "message" => "Usuario logueado exitosamente como administrador",
                        "acces_token" => $token,
                        "user" => $user 
                    ]);
               }else if($user->id_rol == 98){
                    return response()->json([
                        "status" => "success",
                        "message" => "Usuario logueado exitosamente como recepcionista",
                        "acces_token" => $token,
                        "user" => $user 
                    ]);
               }
                //SI TODO ESTA CORRECTO
            }else{
                return response()->json([
                    "status" => "invalid",
                    "message" => "La contraseña es incorrecta"
                ]);
            }
        }else{
            return response()->json([
                "status" => "error",
                "message" => "El usuario no existe"
            ]);
        }
    }   

    public function loginClientes(Request $request) {
        $request->validate([
            "user" => "required",
            "password" => "required"
        ]);

        $user = pacientes::where("numero_documento_paciente_odontologo", "=", $request->user)->first();

        if(isset($user->id)){
            if(($request->password == $user->numero_documento_paciente_odontologo)){
                //CREAMOS EL TOKEN
               $token = $user->createToken("auth_token")->plainTextToken;
                return response()->json([
                    "status" => "success",
                    "message" => "Usuario logueado exitosamente como administrador",
                    "acces_token" => $token,
                    "user" => $user 
                ]);
                //SI TODO ESTA CORRECTO
            }else{
                return response()->json([
                    "status" => "invalid",
                    "message" => "La contraseña es incorrecta"
                ]);
            }
        }else{
            return response()->json([
                "status" => "error",
                "message" => "El usuario no existe"
            ]);
        }
    }   
    public function userProfile(){
        return response()->json([
            "status" => "success",
            "message" => "Perfil del usuario",
            "user" => auth()->user()
        ]);
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            "status" => "success",
            "message" => "Se cerro la session exitosamente",
        ]);
    }
}
