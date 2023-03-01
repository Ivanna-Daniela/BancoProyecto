import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { AuthAService } from 'src/app/services/authA.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { Cuenta } from '../../models/cuenta';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';
import { Global } from '../../services/global';
import { GlobalComponent } from '../globalVar/global-component';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [CuentaService,ClienteService]
})
export class TransactionComponent implements OnInit{
  public url:string;
  public cliente:Cliente;
  public clienteR:Cliente;
  public cuentaE:Cuenta;
  public cuentaR:Cuenta;
  public guardada:Cuenta;
  public confirm:boolean;
  public cuentas: Cuenta[];
  public selectedOption: any;
  public comprobado:string;
  public monto:number;
  public trans:string;
  public ides:string;

  constructor(
    private _cuentaService:CuentaService,
    private _clienteService:ClienteService,
    private _router:Router,
    private _route:ActivatedRoute,
    private http: HttpClient,
    public authAService: AuthAService
  ){
    this.url=Global.url;
    this.cliente=new Cliente("","","","",0,"","");
    this.clienteR=new Cliente("","","","",0,"","");
    this.cuentaE= new Cuenta("",0,"","",0,"","",0);
    this.guardada= new Cuenta("",0,"","",0,"","",0);
    this.cuentaR= new Cuenta("",0,"","",0,"","",0);
    this.confirm=false;
    this.cuentas=[];
    this.comprobado="";
    this.monto=0;
    this.trans="";
    this.ides= GlobalComponent.appId;
    
  }
  
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      console.log("EStos transacciones",GlobalComponent.appId);
      //let id=params['id'];
      let ide = GlobalComponent.appId;
      this.getCliente(GlobalComponent.appId);
      
    })

  }
  getOptions(cliente:string){
    this._cuentaService.getCuentasN(cliente).subscribe(
      response=>{
        if(response.cuentas){
          console.log("Estoy en trans-dgetOptions");
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
        console.log("Estoy en trans-getcliente");
        this.cliente=response.cliente;
        console.log(this.cliente.numero);
        this.getOptions(this.cliente.numero);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  getCuenta(form:NgForm){
    this._cuentaService.clientePorCuenta(this.cuentaR.numero).subscribe(
      response=>{
        if(response.cliente){
          console.log("Estoy en trans-getcuenta");
         this.clienteR=response.cliente;
         console.log(this.clienteR);
         this.comprobado='si';
         form.disabled;
        }
      },
      error =>{
        console.log(<any>error);
        this.comprobado='no';
        form.reset();
      }
    )
  }

  getClienteC(numero:string){
    this._clienteService.getClienteN(numero).subscribe(
      response=>{
        console.log("Estoy en trans-clientec");
        this.clienteR=response.cliente;
        console.log("cliente",this.clienteR);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  transaccion(form:NgForm){
    this._cuentaService.transaccion(this.cuentaE.numero,this.cuentaR.numero,this.monto).subscribe(
      response=>{
        console.log("si pasa");
        this.trans='si';
      },
      error=>{
        this.trans='no';
        console.log("emisor",this.cuentaE.numero,"receptor",this.cuentaR.numero,"monto",this.monto);
        console.log(<any>error);
      }
    )
  }

}
