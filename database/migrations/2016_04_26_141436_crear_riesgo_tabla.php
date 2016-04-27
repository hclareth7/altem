<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CrearRiesgoTabla extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
       Schema::create('riesgos', function (Blueprint $table) {
            $table->bigIncrements('id');
			$table->string('nombre');
			$table->string('descripcion');
		   	$table->bigInteger('tiporiesgo_id')->unsigned();
 			$table->foreign('tiporiesgo_id')->references('id')->on('tipo_riesgos')->onDelete('cascade');
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
         Schema::drop('riesgos');
    }
}
