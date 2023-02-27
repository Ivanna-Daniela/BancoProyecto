import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './components/contacto/contacto.component';
import { CreateclienteComponent } from './components/createcliente/createcliente.component';
import { CreatecuentaComponent } from './components/createcuenta/createcuenta.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PrivateTasksComponent } from './components/private-tasks/private-tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from './auth.guard';
import { AuthAGuard } from './authA.guard';
import { ClientesComponent } from './components/clientes/clientes.component';
import { CuentasComponent } from './components/cuentas/cuentas.component';
import { AdminComponent } from './components/admin/admin.component';
import { PrivateTasksAComponent } from './components/private-tasks-a/private-tasks-a.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  {path:'crearUsuario',component:CreateuserComponent},
  {path:'login',component:LoginComponent},
  {path:'crearCliente',component:CreateclienteComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'cuenta',component:CreatecuentaComponent},
  {path:'tasks',component:TasksComponent},
  {path:'private',component:PrivateTasksComponent,canActivate:[AuthGuard]},
  {path:'privateA',component:PrivateTasksAComponent,canActivate:[AuthAGuard]},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path:'edicionclientes',component:ClientesComponent},
  {path:'cuentas',component:CuentasComponent},
  {path:'clientes',component:ClientesComponent},
  {path:'administrator',component:AdminComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
