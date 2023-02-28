import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { VerificarService } from 'src/app/services/verificar.service';
import { CargarService } from 'src/app/services/cargar.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Global } from 'src/app/services/global';
import { NgForm } from '@angular/forms';
import { GlobalComponent } from '../globalVar/global-component';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
  providers:[ClienteService,CargarService]
})
export class CreateuserComponent implements OnInit{
  cliente1={
    numero:'',
    nombre:'',
    apellido:'',
    telefono:231,
    password:'',
    correo:''
  };
  public numero:string;
  public cliente:Cliente;
  public url:string;
  public status:string;
  public idGuardado:string;

  constructor(
    private _clienteService:ClienteService,
    private _cargarService:CargarService,
    private _router:Router,
    private _route:ActivatedRoute,
    private verificar:VerificarService
  ){
    this.numero="000";
    this.url=Global.url;
    this.cliente=new Cliente("","","","",999999999,"","");
    this.status="";
    this.idGuardado="";
  }


  ngOnInit():void{

  }

  buscarCliente(form:NgForm){
    console.log("si pasa");
    this._clienteService.getClienteN(this.numero).subscribe(
      response=>{
        if(response.cliente){
          
            this.cliente=response.cliente;
            this.status='success';
            this.idGuardado=response.cliente._id;
            form.reset();
            console.log("si pasa");
        }else{
          this.status='failed';
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  signIn(){
    console.log(this.cliente1.numero);
    GlobalComponent.appUrl = this.cliente1.numero;
    this.verificar.signIn(this.cliente1).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this._router.navigate(['/signin']);
      },
      err => console.log(err)
    )
  }
}
