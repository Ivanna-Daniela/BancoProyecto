import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { Cuenta } from '../../models/cuenta';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [CuentaService,ClienteService]
})
export class TransactionComponent implements OnInit{
  public url:string;
  public cliente:Cliente;
  public cuentaE:Cuenta;
  public cuentaR:Cuenta;
  public confirm:boolean;
  public cuentas: Cuenta[];
  public selectedOption: any;


  constructor(
    private _cuentaService:CuentaService,
    private _clienteService:ClienteService,
    private _router:Router,
    private _route:ActivatedRoute,
    private http: HttpClient
  ){
    this.url=Global.url;
    this.cliente=new Cliente("","","","",0,"","");
    this.cuentaE= new Cuenta("",0,"","",0,"","",0);
    this.cuentaR= new Cuenta("",0,"","",0,"","",0);
    this.confirm=false;
    this.cuentas=[];
    
  }
  
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      let id=params['id'];
      this.getCliente(id);
      
    })

  }
  getOptions(cliente:string){
    this._cuentaService.getCuentasN(cliente).subscribe(
      response=>{
        if(response.cuentas){
        this.cuentas=response.cuentas;
        console.log(  response.cuentas);
        }
      },
      error=>{
        console.log(<any>error);
      }
      
    )
  }
  getCliente(id:string){
    this._clienteService.getCliente(id).subscribe(
      response=>{
        this.cliente=response.cliente;
        this.getOptions(this.cliente.numero);
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
