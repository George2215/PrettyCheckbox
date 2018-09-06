<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedicalAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_appointments', function (Blueprint $table) {
            $table->increments('id');
            
            $table->datetime('date');            
            $table->string('color');

            $table->timestamps();

            //Llaves Foráneas
            $table->integer('patient_id')->unsigned();
            $table->integer('appointmentstatus_id')->unsigned();
            $table->integer('doctor_id')->unsigned();

            //Relaciones
            $table->foreign('patient_id')->references('id')->on('patients')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('appointmentstatus_id')->references('id')->on('appointment_statuses')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('doctor_id')->references('id')->on('doctors')
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
        Schema::dropIfExists('medical_appointments');
    }
}
