import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatecuentaComponent } from './components/createcuenta/createcuenta.component';
import { CreateclienteComponent } from './components/createcliente/createcliente.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { PieComponent } from './components/pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatecuentaComponent,
    CreateclienteComponent,
    TransactionComponent,
    CabeceraComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
