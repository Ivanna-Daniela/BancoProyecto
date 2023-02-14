import { Component, OnInit } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { Global } from '../../services/global';
import { CuentaService } from '../../services/cuenta.service';
import { Cuenta } from '../../models/cuenta';

@Component({
  selector: 'app-createcuenta',
  templateUrl: './createcuenta.component.html',
  styleUrls: ['./createcuenta.component.css'],
  providers: [CuentaService,CargarService]
})
export class CreatecuentaComponent implements OnInit{
  public titulo:string;
  public cuenta:Cuenta;
  public cuentaGuardar:Cuenta;
  public url:string;
  public status:string;
  public idGuardado:string;
  constructor(
    private _cuentaService:CuentaService

  ){
    this.titulo="GUARDAR CUENTA";
    this.url=Global.url;
    this.cuenta= new Cuenta('','','','',1,'','');
    this.cuentaGuardar= new Cuenta('','','','',1,'','');
    this.status="";
    this.idGuardado="";
  }
  ngOnInit(): void {
    
  }
  
}
