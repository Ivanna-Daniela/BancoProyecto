import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CreateclienteComponent } from './components/createcliente/createcliente.component';
import { CreatecuentaComponent } from './components/createcuenta/createcuenta.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EditarclienteComponent } from './components/editarcliente/editarcliente.component';
//import { Cliente } from './models/cliente';
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  {path:'crearUsuario',component:CreateuserComponent},
  {path:'login',component:LoginComponent},
  {path:'crearCliente',component:CreateclienteComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'cuenta',component:CreatecuentaComponent},
  {path: 'clientes',component:ClientesComponent},
  {path: 'editarcliente', component:EditarclienteComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
