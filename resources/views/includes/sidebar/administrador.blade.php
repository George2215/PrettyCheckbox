  <!-- SIDEBAR -->
  <div class="sidebar">
    <!-- SIDEBAR USER PANEL (optional) -->
    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="image">
        <img src="{{ asset('img/user2-160x160.jpg') }}" class="img-circle elevation-2" alt="Imágen Perfil">
      </div>
      <div class="info">
        <a href="#" class="d-block">{{ Auth::user()->first_name }}</a>
      </div>
    </div>
    <!-- SIDEBAR MENÚ -->
    <nav class="mt-2">
      <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        <!-- MÓDULO ADMINISTRACIÓN-->        
        <li class="nav-item has-treeview menu-open">
          <a href="#" class="nav-link active">
            <i class="nav-icon fas fa-cogs"></i>
            <p>
              Administración App
              <i class="right fa fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li @click="menu=1" class="nav-item">
              <a href="#" class="nav-link active">
                <i class="fas fa-users nav-icon"></i>
                <p>Usuarios</p>                
              </a>
            </li>
            <li @click="menu=2" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-user-shield nav-icon"></i>
                <p>Roles</p>
              </a>
            </li>
            <li @click="menu=3" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-binoculars nav-icon"></i>
                <p>Permisos</p>
              </a>
            </li>
            <li @click="menu=4" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-user-md nav-icon"></i>
                <p>Médicos</p>
              </a>
            </li>
            <li @click="menu=5" class="nav-item">
              <a href="#" class="nav-link">
                <i class="far fa-clipboard nav-icon"></i>
                <p>Diagnósticos</p>
              </a>
            </li>
          </ul>
        </li>        
        <!-- MÓDULO PACIENTES-->            
        <li class="nav-item has-treeview">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-stethoscope"></i>
            <p>
              Pacientes
              <i class="right fa fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">
            <li @click="menu=6" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-user nav-icon"></i>
                <p>Nuevo Paciente</p>
              </a>
            </li>
            <li @click="menu=7" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-list-alt nav-icon"></i>
                <p>Listado Pacientes</p>
              </a>
            </li>            
          </ul>
        </li>        
        <!-- MÓDULO AGENDAR CITA MÉDICA-->              
        <li class="nav-header">AGENDAR CITA MÉDICA</li>
          <li @click="menu=8" class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon far fa-calendar-alt"></i>
              <p>
                Calendario
                <span class="badge badge-info right">2</span>
              </p>
            </a>
          </li>
        <!-- MÓDULO REPORTES DEL SISTEMA-->       
        <li class="nav-header">REPORTE</li>
        <li @click="menu=9" class="nav-item">
          <a href="#" class="nav-link">
            <i class="nav-icon fa fa-file"></i>
            <p>Generar Historia Clínica</p>
          </a>
        </li>
        <!-- SALIR DEL SISTEMA-->
        <li class="nav-header">SALIR DEL SISTEMA</li>        
        <li class="nav-item">
          <a href="{{ route('logout') }}" class="nav-link" onclick="event.preventDefault();
              document.getElementById('logout-form').submit();">                                            
            <i class="nav-icon fas fa-sign-out-alt text-info"></i>
            <p>Cerrar Sesión</p>
          </a>
          <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            {{ csrf_field() }}
          </form>
        </li>
      </ul>
    </nav>
    <!-- /.SIDEBAR MENÚ -->
  </div>
  <!-- /.SIDEBAR -->
