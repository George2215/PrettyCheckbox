<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('patient', function(){
	return view('patients.index');
});

Auth::routes();

Route::group(['middleware'=>['auth']],function(){
	//Principal Route App
    Route::get('/home', function () {
        return view('contenido.contenido');
    })->name('main');

    //Group Routes Role:Administrador    
    Route::group(['middleware'=>['role:Administrador']],function(){
	    
        //Route User
        Route::get('users','Admin\UserController@index');
	    Route::post('user/register', 'Admin\UserController@store');
        Route::put('user/update', 'Admin\UserController@update');        

	    //Route Role
        Route::resource('roles', 'Admin\RoleController',['except' => 'show','create','edit']);
	    Route::get('role/selectRole', 'Admin\RoleController@selectRole');
        /*Route::get('roles','Admin\RoleController@index');
        Route::post('role/register','Admin\RoleController@store');*/

        //Route Permission
        Route::get('permissions','Admin\PermissionController@index');
        Route::get('getPermissions','Admin\PermissionController@getPermissions');
        Route::post('permission/register', 'Admin\PermissionController@store');
        Route::put('permission/update', 'Admin\PermissionController@update');
    });

    //Group Routes Role:Asistente

    //Group Routes Role:Médico
});


//Route::get('/home', 'HomeController@index')->name('home');
