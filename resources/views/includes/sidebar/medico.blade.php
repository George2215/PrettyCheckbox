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
        <!-- MÓDULO MÉDICO-->            
        <li class="nav-item has-treeview">
          <a href="#" class="nav-link">
            <i class="nav-icon fas fa-stethoscope"></i>
            <p>
              Evaluación Médica
              <i class="right fa fa-angle-left"></i>
            </p>
          </a>
          <ul class="nav nav-treeview">            
            <li @click="menu=10" class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-list-alt nav-icon"></i>
                <p>Evaluaciones Pendientes</p>
              </a>
            </li>            
          </ul>
        </li>                
        <!-- MÓDULO REPORTES DEL SISTEMA-->       
        <li class="nav-header">REPORTE</li>
        <li class="nav-item">
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
