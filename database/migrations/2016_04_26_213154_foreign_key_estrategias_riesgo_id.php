<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ForeignKeyEstrategiasRiesgoId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
       Schema::table('estrategias', function ($table) {
           $this->table=$table;
		   	$table->bigInteger('riesgo_id')->unsigned();
 			$table->foreign('riesgo_id')->references('id')->on('riesgos')->onDelete('cascade');
	   });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $this->table->dropForeign(['riesgo_id']);
    }
}
