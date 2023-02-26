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
import { ClientesComponent } from './components/clientes/clientes.component';

const routes: Routes = [
  {path:'inicio',component:HomeComponent},
  {path:'crearUsuario',component:CreateuserComponent},
  {path:'login',component:LoginComponent},
  {path:'crearCliente',component:CreateclienteComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'cuenta',component:CreatecuentaComponent},
  //{path:'**',component:HomeComponent},
  {path:'tasks',component:TasksComponent},
  {path:'private',component:PrivateTasksComponent,canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'signin',component:SigninComponent},
  {path: 'clientes',component:ClientesComponent},
  {path:'**',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
