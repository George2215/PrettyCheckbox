<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Permisos del Sistema</h3>
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
                            <button type="button" @click="openModal('permission','register')" class="btn btn-outline-primary btn-sm">
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
                                <th>Permiso</th>                                
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                            
                            <tr v-for="permission in arrayPermissions" :key="permission.id">
                                <td v-text="permission.id"></td>
                                <td v-text="permission.name"></td>                                      
                                <td>
                                    <button type="button" @click="openModal('permission','update',permission)" class="btn btn-outline-primary btn-sm" title="Editar">
                                    <i class="far fa-edit"></i>
                                    </button> &nbsp;
                                    <button type="button" @click="openModal('permission','update',permission)" class="btn btn-outline-danger btn-sm" title="Eliminar">
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

            <!--MODAL Registrar/Actualizar-->
            <div class="modal fade" tabindex="-1" :class="{'mostrar' : modal}" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
                <div class="modal-dialog card-info modal-lg" role="document">
                    <div class="modal-content">
                        <div class="card-header">
                            <h4 class="modal-title" v-text="tituloModal"></h4>                                  
                        </div>
                        <div class="modal-body">
                            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">                                
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Permiso</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="name" class="form-control" placeholder="Ingresa Nombre del Permiso">                                        
                                    </div>
                                </div>                             
                                <div v-show="errorPermission" class="form-group row div-error">
                                    <div class="text-center text-error">
                                        <div v-for="error in errorMostrarMsjPermission" :key="error" v-text="error">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary btn-sm" @click="closeModal()">Cerrar</button>
                            <button type="button" v-if="tipoAccion==1" class="btn btn-outline-primary btn-sm" @click="registerPermission()">Registrar</button>
                            <button type="button" v-if="tipoAccion==2" class="btn btn-outline-primary btn-sm" @click="updatePermission()">Actualizar</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!--Fin del Modal-->
    </div><!-- /.row -->        
</template>

<script>
        
    import toastr from 'toastr'  

    //moment.locale('America/Santiago');    

    export default {
        data(){
            return{                            
                modal:0,
                tituloModal:'',
                tipoAccion:0,
                errorPermission:0,
                errorMostrarMsjPermission:[],
                idpermission:0,//Almacena el ID del permiso
                name:'',                
                arrayPermissions: [], //Almacena listado de permisos
                pagination:{ //objeto paginación
                    'total':0,
                    'current_page':0,
                    'per_page':0,
                    'last_page':0,
                    'from':0,
                    'to':0,
                },
                offset: 3, //Valor para la paginación                                                    
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
        methods:{
            openModal(modelo,accion,data=[]){
                switch(modelo){
                    case "permission":
                    {
                        switch(accion)
                        {
                            case 'register':
                            {
                                this.modal=1;//visualizar modal
                                this.tituloModal= 'Registrar Permiso';                                
                                this.name='';                                
                                this.tipoAccion=1; //Accion Register
                                break;
                            }
                            case 'update':
                            {
                                console.log(data);
                                this.modal=1;
                                this.tituloModal='Actualizar Permiso';
                                this.tipoAccion =2;
                                this.idpermission =data['id'];//Obtiene mediante Ajax
                                this.name =data['name'];                                
                                break;
                            }
                        }
                    }
                }
                //this.selectRole();
            },
            closeModal(){
                this.modal=0;
                this.tituloModal='';
                this.name='';
                this.idpermission=0;                
            },
            validatePermission(){
                this.errorPermission=0; //inicializar variable
                this.errorMostrarMsjPermission=[];//inicializar variable
                                
                if(!this.name){
                    this.errorMostrarMsjPermission.push("El nombre del permiso es requerido.");
                }                
                if(this.errorMostrarMsjPermission.length){
                    this.errorPermission =1;
                }

                return this.errorRole;
            },
            registerPermission(){
                if(this.validatePermission()){
                    return;
                }

                let me = this;
                axios.post('permission/register',{
                    'name': this.name                                  
                }).then(function (response){//si todo sale bien cierra modal y muestra el listado general
                    console.log(response.data);
                    me.closeModal();//cierra modal
                    me.getPermissions(); //muestra el listado
                    //me.listarArticulo(1,'','nombre');
                    if(response.data.message==true) {
                        toastr.success("El permiso se registro con éxito");
                    }
                    else{
                        toastr.warning("El permiso ya se encuentra registrado");   
                    }
                }).catch(function (error){
                    console.log(error);
                });
            },
            updatePermission(){
                if(this.validatePermission()){
                    return;
                }

                let me = this;
                var url= 'permission/update';

                axios.put(url,{
                    'name': this.name,
                    'id': this.idpermission
                }).then(function (response){
                    me.closeModal();
                    me.getPermissions();
                    console.log(response.data);
                    if(response.data.message==true) {
                        toastr.success("El permiso se actualizo con éxito");
                    }
                }).catch(function (error){
                    console.log(error);
                });
            },            
            getPermissions(page){
                let me=this;
                var urlPermissions ='permissions?page=' + page;                            

                axios.get(urlPermissions).then(function (response) {
                    var respuesta = response.data;
                    console.log(respuesta);                                    
                    me.arrayPermissions = respuesta.permissions.data;
                    me.pagination = respuesta.pagination;                                   
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            changePage(page){
                let me = this;
                //Actualiza la pagina actual
                me.pagination.current_page = page;

                //Envia la petición para visualizar la data de esa página
                me.getPermissions(page);
            }
        },
        mounted() {
            this.getPermissions(1);
        }

    }
</script>

<style>
    .modal-content{
        width: 100% !important;
        position: absolute !important;
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
