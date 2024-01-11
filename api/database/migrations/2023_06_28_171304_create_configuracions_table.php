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
        Schema::create('configuracions', function (Blueprint $table) {
            $table->id();
            $table->string('telefono');
            $table->string('celular1');
            $table->string('celular2')->nullable();
            $table->string('correo1');
            $table->string('correo2')->nullable();
            $table->string('horario1');
            $table->string('horario2');
            $table->string('direccion');
            $table->string('facebook')->nullable();
            $table->string('instagram')->nullable();
            $table->string('twiter')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('youtube')->nullable();
            $table->string('whatsapp')->nullable();
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
        Schema::dropIfExists('configuracions');
    }
};
