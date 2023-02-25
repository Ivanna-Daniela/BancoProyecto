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
public numero:string; // add a variable to store the client number

constructor(
  private _clienteService:ClienteService
){
  this.url=Global.url;
  this.clientes=[];
  this.numero = ''; // initialize the variable

}
ngOnInit(): void{
  this.getClientes();
  this.searchCliente();
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

searchCliente(){ // create a new method to search for a client
  this._clienteService.getClienteN(this.numero).subscribe(
    response=>{
      if(response.cliente){
        this.clientes = [response.cliente]; // put the found client in an array
        console.log(this.clientes);
      }
    },
    error=>{
      console.log(<any>error);
    }
  ); 
}

}
