import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthAService } from '../../services/authA.service';
import { GlobalComponent } from '../globalVar/global-component';
import { User1Service } from 'src/app/services/user1.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [User1Service,ClienteService]
})
export class SigninComponent implements OnInit {
  public cliente: Cliente;
  public ced: string;
  user = {
    usuario:'',
    password:'',
    numero:''
  }
  constructor(
    public authService: AuthService,
    public authAService: AuthAService,
    private router: Router,
    private _user1Service: User1Service,
    private _clienteService: ClienteService,
    ) {this.cliente=new Cliente('','','',"",123,"","");this.ced="";}

  ngOnInit() {

  }
  signIn(){
      this.authService.signIn(this.user).subscribe(
      res =>{
        console.log("estoy en sign-sigin");
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      err => console.log(err)
    )   
  }
  buscarUser(){
    this._user1Service.getUser(this.user.usuario).subscribe(
      response=>{
        if(response.user){
          console.log("estoy en sing-buscar");
          GlobalComponent.appUrl = response.user.numero;
          this.ced=GlobalComponent.appUrl;
          this.buscarCliente();
         }
         else{
           console.log("Fallo en el buscarUser");
         }
      }
    )
  }
  buscarCliente() {
    if (this.ced !== '') {
      this._clienteService.getClienteN(this.ced).subscribe(
        response => {
          if (response.cliente.length === 1) {
            this.cliente = response.cliente[0];
            console.log("Estoy en sign-cliente"); 
            GlobalComponent.appId = this.cliente._id;
          } else {
            this.cliente=new Cliente('','','',"",123,"","");
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

}
