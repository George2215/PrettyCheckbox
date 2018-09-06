<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
    	if (!$request->ajax()) 
    		return redirect('/');

    	$permissions = Permission::orderBy('name', 'DESC')->paginate(3);

    	return [
    			'pagination' => [
                'total'        => $permissions->total(),
                'current_page' => $permissions->currentPage(),
                'per_page'     => $permissions->perPage(),
                'last_page'    => $permissions->lastPage(),
                'from'         => $permissions->firstItem(),
                'to'           => $permissions->lastItem(),
            	],
    			'permissions' => $permissions
    	];
    }

    public function store(Request $request)
    {   
    	if (!$request->ajax()) 
    		return redirect('/');

    	$name = $request->get('name');
    	$name = Permission::firstOrNew(['name' => $name]);

    	if($name->exists)
    	{
    		return ['message' => false];
    	}else{
    		$permission = Permission::create($request->all());

    		return ['message' => true];
    	}    	
    }

    public function update(Request $request)
    {
    	if (!$request->ajax()) 
    		return redirect('/');

    	$permission = Permission::findOrFail($request->id);

    	$permission->fill($request->all())
    			   ->save();
    			   return ['message' => true];
    }

    public function getPermissions(Request $request)
    {	
    	if (!$request->ajax()) 
    		return redirect('/');

    	$permissions = Permission::orderBy('name', 'DESC')->get();

    	return ['permissions' => $permissions];
    }
}
