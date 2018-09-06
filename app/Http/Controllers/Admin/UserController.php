<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    
    /*Método: index()
      Descripción: Permite mostrar el listado de usuarios registrados
      Implementado: Ing. Jorge Navia
    */
    public function index(Request $request){
        
        if (!$request->ajax()) 
            return redirect('/');

        $users = User::with('roles')->orderBy('id','DESC')->paginate(5);                
        return [
                'pagination' => [
                'total'        => $users->total(),
                'current_page' => $users->currentPage(),
                'per_page'     => $users->perPage(),
                'last_page'    => $users->lastPage(),
                'from'         => $users->firstItem(),
                'to'           => $users->lastItem(),
                ],
                'users' => $users
            ];
    }

    /*Método: store()
      Descripción: Permite almacenar los datos del nuevo usuario dentro del sistema
      Implementado: Ing. Jorge Navia
    */
    public function store(Request $request)
    {
    	if (!$request->ajax()) 
            return redirect('/');
        
    	$identificacion = $request->get('identity_number');
            
        $user = User::firstOrNew(['identity_number' => $identificacion]);
            
            //Valida si el usuario ya se encuentra registrado
            if($user->exists) {                
                return ['message' => false];               
            } else {
                //Envia los datos para el registro del usuario
                $user = new User();
                $user->identity_number = $request->identity_number;
                $user->first_name = $request->first_name;
                $user->last_name = $request->last_name;
                $user->email = $request->email;
                $user->dob = $request->dob;
                $user->phone_number = $request->phone_number;
                $user->password = $request->password;
                
                $user->save();
                $user->assignRole($request->idrol); //Permite asignar el rol del usuario
                                
                return ['message' => true];
                }        
    }

    /*Método: update()
      Descripción: Permite actualizar los datos del usuario existente dentro del sistema
      Implementado: Ing. Jorge Navia
    */
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);
        $input = $request->all();
        $user->fill($input)->save();           

        if ($request->idrol <> '') {        
            $user->roles()->sync($request->idrol);          
        }        
            else {
                $user->roles()->detach();
            }
        
        return ['message' => true];      
    }

}
