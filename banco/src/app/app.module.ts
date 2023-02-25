import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatecuentaComponent } from './components/createcuenta/createcuenta.component';
import { CreateclienteComponent } from './components/createcliente/createcliente.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { PieComponent } from './components/pie/pie.component';
import { HomeComponent } from './components/home/home.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { CreateuserComponent } from './components/createuser/createuser.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditarclienteComponent } from './components/editarcliente/editarcliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatecuentaComponent,
    CreateclienteComponent,
    TransactionComponent,
    CabeceraComponent,
    PieComponent,
    HomeComponent,
    ContactoComponent,
    LoginComponent,
    CreateuserComponent,
    EditarclienteComponent,
    ClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
