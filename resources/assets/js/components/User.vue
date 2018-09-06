<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Usuarios del Sistema</h3>
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
                            <button type="button" @click="openModal('user','register')" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-user-plus"></i>
                            </button>
                        </div>
                    </div>                                    
                </div><!-- /.card-header -->          
                <div class="card-body table-responsive p-0">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Identificación</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>                            
                            <tr v-for="user in arrayUsers" :key="user.id">
                                <td v-text="user.identity_number"></td>
                                <td v-text="user.first_name"></td>
                                <td v-text="user.last_name"></td>
                                <td v-text="user.email"></td>
                                <td v-text="user.phone_number"></td>                                
                                <td v-for="role in user.roles" v-text="role.name"></td>                        
                                <td>
                                    <button type="button" @click="openModal('user','update',user)" class="btn btn-outline-primary btn-sm" title="Editar">
                                    <i class="far fa-edit"></i>
                                    </button> &nbsp;
                                    <button type="button" @click="openModal('user','update',user)" class="btn btn-outline-danger btn-sm" title="Eliminar">
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
                                    <label class="col-md-3 form-control-label" for="text-input">Asignar Rol</label>
                                    <div class="col-md-9">
                                        <select class="form-control" v-model="idrol">
                                            <option value="0" disabled>Seleccione Rol</option>
                                            <option v-for="role in arrayRoles" :key="role.id" :value="role.id" v-text="role.name">
                                            </option>
                                        </select>                                        
                                    </div>
                                </div>             
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Identificación</label>                                    
                                    <div class="col-md-9">
                                        <input type="text" v-model="identity_number" class="form-control" placeholder="Ingrese Identificación">                                
                                    </div>                                    
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Nombres</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="first_name" class="form-control" placeholder="Ingresa Nombre Completo">                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Apellidos</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="last_name" class="form-control" placeholder="Ingresa Apellidos Completos">                          
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="text-input">Fecha Nacimiento</label>
                                    <div class="col-md-9">
                                        <date-picker                                                    
                                                    v-model="dob"                                      
                                                    lang="es"
                                                    format="YYYY-MM-DD"
                                                    date-format="YYYY-MM-DD"
                                                    type="date"
                                                    confirm                                     
                                                    >            
                                        </date-picker>                                                                                                               
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="email-input">Teléfono</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="phone_number" class="form-control" placeholder="Ingrese teléfono">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" for="email-input">Email</label>
                                    <div class="col-md-9">
                                        <input type="email" v-model="email" class="form-control" placeholder="Ingrese Correo Electrónico">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 form-control-label" v-if="tipoAccion==1" for="email-input">Password</label>
                                    <div class="col-md-9">
                                        <input type="password" v-model="password" v-if="tipoAccion==1" class="form-control" placeholder="Ingrese Contraseña">
                                    </div>
                                </div>
                                <div v-show="errorUser" class="form-group row div-error">
                                    <div class="text-center text-error">
                                        <div v-for="error in errorMostrarMsjUser" :key="error" v-text="error">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-outline-secondary btn-sm" @click="closeModal()">Cerrar</button>
                            <button type="button" v-if="tipoAccion==1" class="btn btn-outline-primary btn-sm" @click="registerUser()">Registrar</button>
                            <button type="button" v-if="tipoAccion==2" class="btn btn-outline-primary btn-sm" @click="updateUser()">Actualizar</button>
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
    
    //import Datepicker from 'vuejs-datepicker'
    import DatePicker from 'vue2-datepicker'
    //import {en, es} from 'vuejs-datepicker/dist/locale'
    import moment from 'moment'
    import toastr from 'toastr' 

    //moment.locale('es');

    export default {
        data(){
            return{                                
                modal:0,
                tituloModal:'',
                tipoAccion:0,
                errorUser:0,
                errorMostrarMsjUser:[],
                iduser:0,//Almacena el ID del usuario
                identity_number:'',
                first_name:'',
                last_name:'',                
                dob: '',
                phone_number:0,
                email:'',
                password:'',
                idrol:0,
                arrayRoles: [], //Almacena listado de roles
                arrayUsers: [], //Almacena listado de usuarios
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
        components: {
            DatePicker
        },        
        methods:{
            customFormatter(dob) {                            
                //console.log(moment(dob).format('YYYY-MM-DD'));                                 
                return moment(dob).format('YYYY-MM-DD');
                //return fecha;                  
            },
            openModal(modelo,accion,data=[]){
                switch(modelo){
                    case "user":
                    {
                        switch(accion)
                        {
                            case 'register':
                            {
                                this.modal=1;//visualizar modal
                                this.tituloModal= 'Registrar Usuario';
                                this.idrol=0;
                                this.identity_number='';
                                this.first_name='';
                                this.last_name='';
                                this.dob='';
                                this.phone_number='';
                                this.email='';
                                this.password='';
                                this.tipoAccion=1; //Accion Register
                                break;
                            }
                            case 'update':
                            {
                                console.log(data);                            
                                this.modal=1;
                                this.tituloModal='Actualizar Usuario';
                                this.tipoAccion =2;
                                this.iduser =data['id'];//Obtiene mediante Ajax
                                this.identity_number =data['identity_number'];
                                this.first_name =data['first_name'];                                
                                this.last_name =data['last_name'];
                                this.dob =data['dob'];
                                this.phone_number =data['phone_number'];
                                this.email =data['email'];
                                this.password =data['password'];
                                this.idrol =data['roles'][0].id;//array Roles y posicion[0] y se recupera ID del rol usuario a editar
                                break;
                            }
                        }
                    }
                }
                this.selectRole();
            },
            closeModal(){
                this.modal=0;
                this.tituloModal='';
                this.identity_number='';
                this.first_name='';
                this.last_name='';
                this.dob='';
                this.phone_number='';
                this.email='';                
                this.password='';
                this.idrol=0;
                this.iduser=0;
                this.errorUser=0;
                this.errorMostrarMsjUser=[]                
            },
            validateUser(){
                this.errorUser=0; //inicializar variable
                this.errorMostrarMsjUser=[];//inicializar variable
                
                if(this.idrol==0){
                    this.errorMostrarMsjUser.push("Seleccione un rol.");
                }
                if(!this.identity_number){
                    this.errorMostrarMsjUser.push("La identificación del usuario es requerida.");
                }
                if(!this.first_name){
                    this.errorMostrarMsjUser.push("El nombre del usuario es requerido.");
                }
                if(!this.last_name){
                    this.errorMostrarMsjUser.push("El apellido del usuario es requerido.");
                }
                /*if(!this.dob){
                    this.errorMostrarMsjUser.push("La fecha de nacimiento es requerida.");
                }*/
                if(!this.phone_number){
                    this.errorMostrarMsjUser.push("El telefono es requerido.");
                }
                if(!this.email){
                    this.errorMostrarMsjUser.push("El email es requerido.");
                }
                /*if(!this.password){
                    this.errorMostrarMsjUser.push("El password es requerido.");
                }*/
                if(this.errorMostrarMsjUser.length){
                    this.errorUser =1;
                }

                return this.errorUser;
            },
            registerUser(){
                if(this.validateUser()){
                    return;
                }

                let me = this;
                axios.post('user/register',{
                    'identity_number': this.identity_number,
                    'first_name': this.first_name,                    
                    'last_name': this.last_name,
                    'dob': this.customFormatter(this.dob),
                    'phone_number': this.phone_number,
                    'email': this.email,
                    'password':this.password,
                    'idrol': this.idrol                    
                }).then(function (response){//si todo sale bien cierra modal y muestra el listado general
                    console.log(response.data);
                    me.closeModal();
                    me.getUsers();
                    //me.listarArticulo(1,'','nombre');
                    if(response.data.message==true) {
                        toastr.success("El empleado se registro con éxito");
                    }
                    else{
                        toastr.warning("El empleado ya se encuentra registrado");   
                    }
                }).catch(function (error){
                    console.log(error);
                });
            },
            updateUser(){
                if(this.validateUser()){
                    return;
                }

                let me = this;
                var urlUpdate = 'user/update';
                axios.put(urlUpdate,{
                    'id': this.iduser,//ID del usuario a editar
                    'identity_number': this.identity_number,
                    'first_name': this.first_name,
                    'last_name': this.last_name,
                    'dob': this.customFormatter(this.dob),
                    'phone_number': this.phone_number,
                    'email': this.email,
                    'password':this.password,
                    'idrol': this.idrol
                }).then(function (response){
                    console.log(response.data);
                    me.closeModal();
                    me.getUsers();
                    if(response.data.message==true) {
                        toastr.success("El empleado se actualizo con éxito");
                    }else{
                        toastr.warning("El empleado no pudo ser actualizado");   
                    }
                }).catch(function (error){
                    console.log(error);
                });
            },
            selectRole(){
                let me=this;
                var url= 'role/selectRole';

                axios.get(url).then(function (response) {
                    //console.log(respuesta);
                    var respuesta = response.data;                                    
                    me.arrayRoles = respuesta.roles; //Llena el arrayRoles con el resultado                   
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            getUsers(page){
                let me=this;
                var urlUsers ='users?page=' + page;                                

                axios.get(urlUsers).then(function (response) {
                    var respuesta = response.data;
                    console.log(respuesta);                                    
                    me.arrayUsers = respuesta.users.data;
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
                me.getUsers(page);
            }
        },
        mounted() {
            this.getUsers(1);                       
        }        
    }
</script>

<style>
    .modal-content .modal-body {
        position: relative;
        padding: 20px 10px;
    }
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