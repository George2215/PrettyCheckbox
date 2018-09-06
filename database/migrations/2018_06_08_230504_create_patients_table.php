<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePatientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->increments('id');
            
            $table->bigInteger('identity_number')->unique()->unsigned();
            
            $table->string('first_name',128);
            $table->string('last_name',128);
            $table->string('sex',12);            
            $table->string('home_address',128);
            $table->bigInteger('phone_number');
            $table->bigInteger('phone_number2');
            $table->date('dob');

            $table->timestamps();

            //Llaves Foráneas
            $table->integer('maritalstatus_id')->unsigned();
            $table->integer('academicformation_id')->unsigned();
            $table->integer('typeidentity_id')->unsigned();


            //Relaciones
            $table->foreign('maritalstatus_id')->references('id')->on('marital_statuses')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('academicformation_id')->references('id')->on('academic_formations')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('typeidentity_id')->references('id')->on('type_identities')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
}
