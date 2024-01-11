<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transacciones', function (Blueprint $table) {
            $table->id();
            $table->string('id_transaccion')->unique();
            $table->string('status');
            $table->string('tipo');
            $table->string('order_id');
            $table->string('nombres');
            $table->string('apellidos');
            $table->string('email');
            $table->string('celular');
            $table->mediumText('comentario')->nullable();
            $table->string('delivery');
            $table->string('total_pago');
            $table->mediumText('array_productos');
            $table->integer('estado');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transacciones');
    }
};
