import { Component, OnInit } from '@angular/core';
import { CargarService } from 'src/app/services/cargar.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from '../../models/cliente';
import { NgForm } from '@angular/forms';
import { Global } from '../../services/global';

@Component({
  selector: 'app-createcliente',
  templateUrl: './createcliente.component.html',
  styleUrls: ['./createcliente.component.css'],
  providers: [ClienteService, CargarService]
})
export class CreateclienteComponent implements OnInit{
  public cliente:Cliente;
  public clienteGuardar:Cliente;
  public url:string;
  public status:string;
  public idGuardado:string;

  constructor(
    private _clienteService:ClienteService
  ){
    this.url=Global.url;
    this.cliente= new Cliente('','','','',1,'','');
    this.clienteGuardar= new Cliente('','','','',1,'','');
    this.status="";
    this.idGuardado="";
  }

  ngOnInit(): void {
  }
  guardarCliente(form:NgForm) {
    this._clienteService.guardarCliente(this.clienteGuardar).subscribe(
      response => {
        if(response.cliente) {
          this.status = 'success';
          this.idGuardado = response.id;
          this.clienteGuardar = response.cliente;
          form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    );
  }
}
