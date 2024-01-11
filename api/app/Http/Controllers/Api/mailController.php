<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\Notification;
use App\Mail\NotificationDoctor;
use App\Models\transacciones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use GuzzleHttp\Client;

class mailController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'user' => 'required|string',
            'pass' => 'required|string',
            'email' => 'required|string',
            'user_odontologo' => 'required|string',
            'pass_odontologo' => 'required|string',
            'email_odontologo' => 'required|string',
        ]);
        $name = $request->name;
        $user = $request->user;
        $pass = $request->pass;
        $email = $request->email;
        $user_odontologo = $request->user_odontologo;
        $pass_odontologo = $request->pass_odontologo;
        $email_odontologo = $request->email_odontologo;
        $correo = new Notification($name, $user, $pass);
        $correo_odontologo = new NotificationDoctor($name, $user_odontologo, $pass_odontologo);
        Mail::to("jamiom@ucvvirtual.edu.pe")->send($correo);
        Mail::to("jamiom@ucvvirtual.edu.pe")->send($correo_odontologo);
        // Devuelve una respuesta adecuada a React
        return response()->json(['status' => "success"], 200);
    }

    public function handleMercadoPagoWebhook(Request $request)
    {
        $accessToken = 'APP_USR-7222992427774592-070812-7dc7d7a9b3ad29414a48145866939ab2-1418619994';
        $headers = [
            'Authorization' => 'Bearer ' . $accessToken,
            'Content-Type' => 'application/json',
        ];

        $evento = $request->all();
        $idTransaccion = $evento['data']['id'];
        // Realizar la petición a la API de Mercado Pago
        $response = Http::withHeaders($headers)->get('https://api.mercadopago.com/v1/payments/' . $idTransaccion);

        $saveTransaccion = new transacciones();
        $saveTransaccion->id_transaccion = $idTransaccion;

        $saveTransaccion->status = $response['status'];
        $saveTransaccion->tipo = $response['payment_method']['type'];
        $saveTransaccion->order_id = $response['order']['id'];

        $saveTransaccion->nombres = $response['additional_info']['payer']['first_name'];
        $saveTransaccion->apellidos = $response['additional_info']['payer']['last_name'];
        $saveTransaccion->email =  $response['payer']['email'];

        $saveTransaccion->celular = $response['additional_info']['payer']['phone']['number'];

        $saveTransaccion->comentario = $response['external_reference'];
        $saveTransaccion->delivery = $response['metadata']['comment'];
        $saveTransaccion->total_pago = $response['transaction_details']['total_paid_amount'];
        $items = $response['additional_info']['items'];
        $saveTransaccion->array_productos = json_encode($items);
        // Procesar los datos de la transacción
        $saveTransaccion->save();

        // Responder a Mercado Pago con un código HTTP 200 para indicar que se ha procesado el evento correctamente
        return response()->json(['status' => 'success'], 200);
    }


    public function handleSuccessTransaction(Request $request)
    {
        $saveTransaccion = new transacciones();

        $request->validate([
            'id_transaccion' => 'required',
            'status' => 'required',
            'tipo' => 'required',
            'order_id' => 'required',
            'nombres' => 'required',
            'apellidos' => 'required',
            'email' => 'required',
            'celular' => 'required',
            'comentario' => 'nullable',
            'delivery' => 'required',
            'total_pago' => 'required',
            'array_productos' => 'required',

        ]);

        $saveTransaccion->id_transaccion = $request->id_transaccion;
        $saveTransaccion->status = $request->status;
        $saveTransaccion->tipo = $request->tipo;
        $saveTransaccion->order_id = $request->order_id;
        $saveTransaccion->nombres = $request->nombres;
        $saveTransaccion->apellidos = $request->apellidos;
        $saveTransaccion->email = $request->email;
        $saveTransaccion->celular = $request->celular;
        $saveTransaccion->comentario = $request->comentario;
        $saveTransaccion->delivery = $request->delivery;
        $saveTransaccion->total_pago = $request->total_pago;
        $saveTransaccion->array_productos = $request->array_productos;

        $result = $saveTransaccion->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }

    public function index()
    {
        $productos = transacciones::orderBy('id', 'desc')->get();
        return $productos;
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

    public function buscar(Request $request)
    {
        $search = '%' . $this->quitarAcentos($request->buscar) . '%';
        $resultados = transacciones::Where('id_transaccion', 'LIKE', $search)
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($resultados);
    }

    public function show($ui)
    {
        $transacciones = transacciones::select('delivery')
            ->where('delivery', '=', $ui)
            ->get();

        return response()->json($transacciones);
    }


    public function show2($id)
    {
        $verProducto = transacciones::find($id);
        return $verProducto;
    }

    public function update(Request $request, $id)
    {
        $updateCategoria = transacciones::findOrFail($id);

        $request->validate([
            'estado' => 'required',
        ]);

        $updateCategoria->estado = $request->estado;

        $result = $updateCategoria->save();

        if ($result) {
            return response()->json(['status' => "success"]);
        } else {
            return response()->json(['status' => "error"]);
        }
    }
}
