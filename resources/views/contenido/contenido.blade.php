@extends('plantilla')
@section('contenido')	
	@role('Administrador')
        <template v-if="menu==1">
            <user></user>
        </template>
        <template v-if="menu==2">
            <role></role>
        </template>
    	<template v-if="menu==3">
            <permission></permission>
        </template>
        <template v-if="menu==4">
            Médicos
        </template>
        <template v-if="menu==5">
            Diagnosticos
        </template>
    @endrole	
@endsection