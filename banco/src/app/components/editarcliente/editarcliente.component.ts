import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { Global } from '../../services/global';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-editarcliente',
  templateUrl: './editarcliente.component.html',
  styleUrls: ['./editarcliente.component.css'],
  providers: [ClienteService]
})
export class EditarclienteComponent implements OnInit{
public url:string;
public cliente:Cliente;
public confirm:boolean;

constructor(
  private _clienteService:ClienteService,
  private _router:Router,
  private _route:ActivatedRoute
){
  this.url=Global.url;
  this.cliente= new Cliente("","","","",1234567,"","");
  this.confirm= false;
}
  ngOnInit(): void {    
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getCliente(id);
    })
}
getCliente(id:string){
  this._clienteService.getCliente(id).subscribe(
    response=>{
      this.cliente=response.cliente;
    },
    error=>{
      console.log(<any>error);
    }
  )
}
setConfirm(confirm:boolean){
  this.confirm=confirm;
}
}
