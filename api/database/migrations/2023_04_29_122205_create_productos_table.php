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
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_categoria');
            $table->string('nombre');
            $table->string('imagen1');
            $table->string('imagen2')->nullable();
            $table->string('imagen3')->nullable();
            $table->mediumtext('descripcion');
            $table->mediumtext('caracteristicas')->nullable();
            $table->decimal('precio', 10, 2);
            $table->integer('cantidad');
            $table->decimal('oferta', 10, 2);
            $table->string('favoritos');
            $table->foreign('id_categoria')->references('id')->on('categorias');
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
        Schema::dropIfExists('productos');
    }
};
