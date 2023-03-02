import { Component, OnInit } from '@angular/core';
import { CargarService } from '../../services/cargar.service';
import { Global } from '../../services/global';
import { CuentaService } from '../../services/cuenta.service';
import { Cuenta } from '../../models/cuenta';
import { NgForm } from '@angular/forms';
import { AuthAService } from 'src/app/services/authA.service';

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
    private _cuentaService:CuentaService,
    public authAService: AuthAService
  ){
    this.titulo="GUARDAR CUENTA";
    this.url=Global.url;
    this.cuenta= new Cuenta('',1,'','',1,'','',1);
    this.cuentaGuardar= new Cuenta('',1,'','',1,'','',1);
    this.status="";
    this.idGuardado="";
  }

  ngOnInit(): void {
  }

  guardarCuenta(form:NgForm) {
    this._cuentaService.guardarCuenta(this.cuenta).subscribe(
      response => {
        if(response.cuenta) {
          this.status = 'success';
          this.idGuardado = response.id;
          this.cuentaGuardar = response.cuenta;
          console.log(response.cuenta);
          //console.log(response.cuenta);
          form.reset();
        } else {
          this.status = 'failed';
          form.reset();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'failed';
        form.reset();
      }
    );
  }

}
