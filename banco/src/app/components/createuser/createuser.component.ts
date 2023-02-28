import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../models/cliente';
import { UserService } from '../../services/user.service';
import { CargarService } from '../../services/cargar.service';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
  providers:[ClienteService,CargarService]
})
export class CreateuserComponent implements OnInit{
  cliente1 ={
    numero:'',
    password:''
  }
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
    private userService:UserService
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
    this.userService.signIn(this.cliente1).subscribe(
      res => {
        console.log(res);
        //Redirige al usuario a la página de home
        this._router.navigate(['/signup']);
      },
      err => console.log(err)
    )
  }
}
