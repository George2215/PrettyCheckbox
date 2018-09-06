<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMedicalEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('medical_evaluations', function (Blueprint $table) {
            $table->increments('id');
            
            //Antecedentes Personales
            $table->string('pathologic',300);
            $table->string('surgical',300);
            $table->string('allergic',300);
            //Motivo Consulta
            $table->string('reason',500);          
            //Signos Vitales
            $table->string('blood_pressure',50);
            $table->string('heart_rate',50);
            $table->string('breathing_frequency',50);
            //Exámen Físico
            $table->integer('height')->unsigned();
            $table->integer('weight')->unsigned();
            $table->double('imc',4,2)->unsigned();
            $table->string('abdomen',300);
            $table->string('mouth_pharynx',300);
            $table->string('head',300);
            $table->string('face',300);
            $table->string('heart',300);
            $table->string('neck',300);
            $table->string('back',300);
            $table->string('extremities',300);
            $table->string('genito',300);
            $table->string('nose',300);
            $table->string('ear',300);
            $table->string('skin',300);
            $table->string('lung',300);
            $table->string('chest',300);
            //Tratamiento Médico
            $table->string('treatment',500);            
            //Datos Básicos Historia Clínica
            $table->date('date');
            $table->time('hour');            
            $table->integer('age')->unsigned();
            
            $table->timestamps();

            //Llaves Foráneas
            $table->integer('diagnostic_id')->unsigned();
            $table->integer('doctor_id')->unsigned();
            $table->integer('patient_id')->unsigned();

            //Relaciones
            $table->foreign('diagnostic_id')->references('id')->on('diagnostics')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('doctor_id')->references('id')->on('doctors')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            $table->foreign('patient_id')->references('id')->on('patients')
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
        Schema::dropIfExists('medical_evaluations');
    }
}
