<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use DB;

class RoleController extends Controller
{    
	
	/*Método: index()
	  Descripción: Permite traer todos los datos de los roles almacenados en BD
	  Implementa: Ing. Jorge Navia
	*/
	public function index(Request $request)
	{
		/*if (!$request->ajax()) 
            return redirect('/');*/

		$roles = Role::with('permissions')->orderBy('id','DESC')->paginate(5);

		return [
                'pagination' => [
                'total'        => $roles->total(),
                'current_page' => $roles->currentPage(),
                'per_page'     => $roles->perPage(),
                'last_page'    => $roles->lastPage(),
                'from'         => $roles->firstItem(),
                'to'           => $roles->lastItem(),
                ],
                'roles' => $roles
            ];			
	}

	/*Método: store()
	  Descripción: Permite crear el rol con sus respectivos permisos
	  Implementa: Ing. Jorge Navia
	*/	  
	public function store(Request $request)
	{				
		$name = $request->get('name');		            
        $nameR = Role::firstOrNew(['name' => $name]);

		if($nameR->exists){		
			return ['message' => false];
		}else{
			$input = $request->except(['permissions']);  //Omite la entrada de los permisos
			$role = Role::create($input); //Guarda el rol        

        	if($request->permissions <> ''){
            	$role->permissions()->attach($request->permissions);

            	return ['message' => true];
        	}
		}                
	}	

	/*Método: update()
	  Descripción: Permite actualizar el rol con nuevos permisos
	  Implementa: Ing. Jorge Navia
	*/
	public function update(Request $request, $id)
	{				
		//$role = Role::findOrFail($id);
        /*$input = $request->except(['permissions']);  //Omite la entrada permissions         
        $role->fill($input)->save();

        if($request->permissions <> ''){
            $role->permissions()->sync($request->permissions);
        }   

		return ['message' => true];  */
		$role = Role::findOrFail($id);
        $role->id = $request->id;
        $role->name = $request->name;      
        $role->save();
        
        
        $arrayPermisos=$request->permissions;      

        $idpermi = array_pluck($arrayPermisos, 'id');        
        
        $role->permissions()->sync($idpermi); //Permite sincronizar los permisos del rol         
                                
        return ['message' => true];
                         
	}

	/*Método: selectRole()
	  Descripción: Permite traer todos los datos de los roles almacenados
	  Implementa: Ing. Jorge Navia
	*/
	public function selectRole(Request $request)
	{
		//Seguridad peticiones HTTP
        if(!$request->ajax())
            return redirect('/');

        $roles = Role::select('id','name')->get(); //Obtiene todos los roles

        return ['roles' => $roles]; //Devuelve un array llamado roles
	}
}
