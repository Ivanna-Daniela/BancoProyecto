import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers:[ClienteService]
})
export class ClientesComponent implements OnInit{
public clientes:Cliente[];
public url:string;

constructor(
  private _clienteService:ClienteService
){
  this.url=Global.url;
  this.clientes=[];
}
ngOnInit(): void{
  this.getClientes();
}
getClientes(){
  this._clienteService.getClientes().subscribe(
    response=>{
      if(response.clientes){
        this.clientes=response.clientes;
        console.log(this.clientes);
      }
    },
    error=>{
      console.log(this.url);
      console.log(<any>error);
    }
  ); 
}
}
