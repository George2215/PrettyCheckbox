<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Roles del Sistema</h3>
                    <div class="d-flex">
                        <div class="col-9">
                        </div>
                        <div class="col-2">
                            <div class="input-group input-group-sm" style="width: 150px;">
                                <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                                <div class="input-group-append">
                                  <button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>
                                </div>                            
                            </div>
                        </div>
                        <div class="ml-auto create-plus">
                            <button type="button" @click="openModal()" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-user-plus"></i>
                            </button>
                        </div>
                    </div>                                    
                </div><!-- /.card-header -->          
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Rol</th>                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                            
                            <tr v-for="role in arrayRoles">                                
                                <td v-text="role.id"></td>
                                <td v-text="role.name"></td>                                           
                                <td>
                                    <button type="button" class="btn btn-outline-primary btn-sm" title="Editar" v-on:click="editRole(role)">
                                    <i class="far fa-edit"></i>
                                    </button> &nbsp;
                                    
                                    <button type="button" class="btn btn-outline-danger btn-sm" title="Eliminar">
                                    <i class="far fa-trash-alt"></i>
                                    </button> &nbsp;
                                </td>
                            </tr>   
                        </tbody>                                            
                    </table>
                </div><!-- /.card-body -->                

                <!--Paginación-->
                <div class="card-footer clearfix">
                    <ul class="pagination pagination-sm m-0 float-right">
                      <li class="page-item" v-if="pagination.current_page > 1">
                        <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page - 1)">&laquo;</a>
                      </li>
                      <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                        <a class="page-link" href="#" @click.prevent="changePage(page)" v-text="page"></a>
                      </li>                      
                      <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                        <a class="page-link" href="#" @click.prevent="changePage(pagination.current_page + 1)">&raquo;</a>
                      </li>
                    </ul>
                </div>
            </div><!-- /.card -->        
        </div><!--col-12-->

        <!--MODAL Registrar-->
            <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal}" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog card-info modal-lg" role="document">
                    <div class="modal-content">
                        <div class="card-header">
                            <h4 class="modal-title" v-text="tituloModal"></h4>                                  
                        </div>
                        <div class="modal-body col-md-12">
                            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">                                
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Rol</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="name" class="form-control" placeholder="Ingresa Nombre del Rol">                                        
                                    </div>
                                </div>
                                
                                <div class="form-group">                        
                                    <label>Lista de permisos</label>
                                    <hr>                    
                                </div>                                                             
                                
                                <div class="row">
                                    <div class="col-md-3" v-for="(permission, index) in arrayPermissions" :key="index">
                                        <input type="checkbox" :id="permission.id" :value="permission.id" v-model="permissions" class="input-cbx">
                                    <label :for="permission.id" class="check label-cbx" v-text="permission.name">
                                    </label>
                                </div>
                                </div>
                                
                                
                                
                                <!--<div v-for="permission in arrayPermissions">
                                    <p-check class="p-icon p-curve" color="success" v-model="permissions" :value="permission.id">
                                        <i class="icon fa fa-check" slot="extra"></i>
                                        {{ permission.name }}
                                    </p-check>            
                                </div>-->
                                <div v-show="errorRole" class="form-group row div-error">
                                    <div class="text-center text-error">
                                        <div v-for="error in errorMostrarMsjRole" :key="error" v-text="error">
                                        </div>
                                    </div>
                                </div>                                                        
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary btn-sm" @click="closeModal()">Cerrar</button>
                            <button type="button" v-if="tipoAccion==1" class="btn btn-outline-primary btn-sm" @click="registerRole()">Registrar</button>
                            <button type="button" v-if="tipoAccion==2" class="btn btn-outline-primary btn-sm" @click="updateRole()">Actualizar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
        <!--Fin del Modal Registro-->

        <!--MODAL Editar-->
            <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal2}" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog card-info modal-lg" role="document">
                    <div class="modal-content">
                        <div class="card-header">
                            <h4 class="modal-title" v-text="tituloModal"></h4>                                  
                        </div>
                        <div class="modal-body">
                            <form method="post" enctype="multipart/form-data" class="form-horizontal">                                
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Rol</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="name" class="form-control" placeholder="Ingresa Nombre del Rol">                                        
                                    </div>
                                </div>
                                
                                <div class="form-group">                        
                                    <label>Lista de permisos</label>
                                    <hr>
                                </div>
                                
                                <!--<div class="checkboxes" v-for="(permission, index) in arrayPermissions" :key="index">
                                    <input class="form-check-input" type="checkbox" :value="permission" v-model="permissions">
                                    <label :for="index" class="check" v-text="permission.name">
                                    </label>
                                </div>-->

                                <!--<div class="checkboxes label-cbx" v-for="permission in arrayPermissions">
                                    <input type="checkbox" :value="permission" v-model="permissions">
                                    <label :for="permission" class="check" v-text="permission.name">
                                    </label>
                                </div>-->
                                
                                    <div class="row">
                                        <div class="col-md-3" v-for="permission in arrayPermissions">
                                            <p-check class="p-icon p-curve" color="success" v-model="permissions" :value="permission">
                                                <i class="icon fa fa-check" slot="extra"></i>
                                                {{ permission.name }}
                                            </p-check>            
                                        </div>
                                    </div>                                                            
                                
                                
                                <p class="lead text-center">Permissions</p>
                                <div class="alert alert-primary" role="alert" v-if="permissions.length === 0">
                                    No hay permissions en el momento.
                                </div>
                                <ul class="list-group" v-else>
                                    <li class="list-group-item"
                                        v-for="(permission, index) in permissions" :key="index">
                                        {{ permission.id }}. {{ permission.name }}
                                    </li>
                                </ul>                                                

                                <div v-show="errorRole" class="form-group row div-error">
                                    <div class="text-center text-error">
                                        <div v-for="error in errorMostrarMsjRole" :key="error" v-text="error">
                                        </div>
                                    </div>
                                </div>                                                        
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary btn-sm" @click="closeModal()">Cerrar</button>
                            <button type="button" v-if="tipoAccion==1" class="btn btn-outline-primary btn-sm" @click="registerRole()">Registrar</button>
                            <button type="button" v-if="tipoAccion==2" class="btn btn-outline-primary btn-sm" @click="updateRole(idrole)">Actualizar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
        <!--Fin del Modal Registro-->        
    </div><!-- /.row -->        
</template>

<script>
    
    //import axios from 'axios'    
    import toastr from 'toastr'
    import PrettyCheckbox from 'pretty-checkbox-vue';
    Vue.use(PrettyCheckbox);

    export default {
        data(){
            return{                                        
                modal:0,
                modal2:0,
                tituloModal:'',
                tipoAccion:0,                
                errorRole:0,
                errorMostrarMsjRole:[],
                idrole:0,//Almacena el ID del rol
                name:'',                
                arrayRoles: [], //Almacena listado de roles
                arrayPermissions: [], //Almacena listado de permisos
                permissions:[], //Almacena los ID de cada permiso
                pagination:{ //objeto paginación
                    'total':0,
                    'current_page':0,
                    'per_page':0,
                    'last_page':0,
                    'from':0,
                    'to':0,
                },
                offset: 3 //Valor para la paginación
            }
        },
        computed:{
            isActived: function(){ //retorna página actual
                return this.pagination.current_page;

            },
            //Calcular elementos de paginación
            pagesNumber:function(){
                if(!this.pagination.to){ //si es diferente a TO retorna un array vacio
                    return[];
                }
                var from = this.pagination.current_page - this.offset;
                if(from < 1){ //define si solo tiene una pagina, la nombre como 1
                    from = 1;
                }

                var to = from + (this.offset * 2);
                if(to >= this.pagination.last_page){
                    to = this.pagination.last_page;
                }

                var pagesArray = [];
                while(from <= to){
                    pagesArray.push(from);
                    from++;
                }
                
                return pagesArray; //retorna el arreglo
            }           
        },
        watch: {
            arrayPermissions(value) {
                console.log(value);
                if (this.permissions.length) {
                    const find = require('lodash/fp/find');
                    let permissions = [];
                    for (let p of this.permissions) {
                        let permission = find(o => o.id === p.id)(value);
                        permissions.push(permission);
                    }
                    this.permissions = permissions;
                }
            }
        },                
        methods:{
            changePage(page){
                let me = this;
                //Actualiza la pagina actual
                me.pagination.current_page = page;

                //Envia la petición para visualizar la data de esa página
                me.getRoles(page);
            },
            getRoles(page){
                let me=this;
                var urlRoles ='roles?page=' + page;                                

                axios.get(urlRoles).then(function (response) {
                    var respuesta = response.data;
                    console.log(respuesta);                                    
                    me.arrayRoles = respuesta.roles.data;
                    me.pagination = respuesta.pagination;                                    
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            openModal() {
                this.modal=1;//visualizar modal
                this.tituloModal= 'Registrar Rol';                                
                this.name='';                                                            
                this.tipoAccion=1; //Accion Register
                this.getPermissions();
            },
            editModal() {
                this.modal2=2;//visualizar modal
                this.tituloModal= 'Actualizar Rol';                             
                this.tipoAccion=2; //Accion Register
                this.getPermissions();
            },
            closeModal(){
                this.modal=0;
                this.modal2=0;
                this.tituloModal='';
                this.name='';
                this.idrole  = '';                
                this.permissions=[];                
            },
            getPermissions(){
                let me=this;
                var urlPermissions ='getPermissions';
                    axios.get(urlPermissions).then(function (response) {
                    var respuesta = response.data;
                    console.log(respuesta);                                    
                    me.arrayPermissions = respuesta.permissions;                                        
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            registerRole(){
               /* if(this.validateRole()){
                    return;
                }*/
                var url ='roles';
                let me = this;
                axios.post(url,{
                    'name': this.name,
                    'permissions': this.permissions                                
                }).then(function (response){//si todo sale bien cierra modal y muestra el listado general
                    //console.log(response.data);
                    me.closeModal();//cierra modal
                    me.getRoles(); //muestra el listado                    
                    if(response.data.message==true) {
                        toastr.success("El rol se registro con éxito");
                    }
                    else{
                        toastr.warning("El rol ya se encuentra registrado");   
                    }
                }).catch(function (error){
                    console.log(error.message);
                });
            },
            editRole(role){
                //console.log(role);                                         
                this.idrole   = role.id;
                this.name = role.name;
                this.permissions = role['permissions'];
                this.editModal();//muestra el formulario
            },
            updateRole(id){
                //console.log(response.data.message);
                var urlUpdate='roles/'+id;                
                axios.put(urlUpdate, {'name':this.name,
                                      'id':this.idrole,
                                      'permissions':this.permissions}).then(response=>{
                this.getRoles();                
                //this.errors = [];
                this.closeModal();
                //console.log(response.data.message);
                if(response.data.message==true) {
                        toastr.success("El rol se actualizo con éxito");
                    };
                }).catch(error=>{
                    this.errors = error.response.data
                });
            }            
        },
        mounted() {
            this.getRoles(1);
        }
    }
</script>

<style>
    .modal{
        background: #FFFFFF;
        box-shadow: 2px 2px 20px 1px;
        overflow-x: auto;
        display: flex;
        flex-direction: column;        
    }
    .modal-body {
        position: relative;
        padding: 20px 10px;
    }
    .modal-content{
        width: 100% !important;
        position: absolute;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: absolute !important;
        background-color: #3c29297a !important;
    }
    .div-error{
        display: flex;
        justify-content: center;
    }
    .text-error{
        color: red !important;
        font-weight: bold;
    }

</style>
