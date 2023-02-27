import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  public guardada:Cuenta;
  public confirm:boolean;
  public cuentas: Cuenta[];
  public selectedOption: any;
  public comprobado:string;


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
    this.guardada= new Cuenta("",0,"","",0,"","",0);
    this.cuentaR= new Cuenta("",0,"","",0,"","",0);
    this.confirm=false;
    this.cuentas=[];
    this.comprobado="";
    
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
  getCuenta(form:NgForm){
    this._cuentaService.getCuentaN(this.cuentaR.cliente).subscribe(
      response=>{
        if(response.cuenta){
          console.log(response.cuenta);
          this.guardada=response.cuenta;
          console.log("guardada", this.guardada.numero);
          console.log("R", this.cuentaR.numero);
          if(this.guardada.numero == this.cuentaR.numero){

            this.comprobado='si';
            form.reset();
          }else{
            this.comprobado='no';
            form.reset();
          }

        }
      },
      error =>{

      }
    )
  }

}
