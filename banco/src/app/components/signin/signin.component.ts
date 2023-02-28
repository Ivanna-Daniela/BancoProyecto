import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthAService } from '../../services/authA.service';
import { GlobalComponent } from '../globalVar/global-component';
import { User1Service } from 'src/app/services/user1.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [User1Service]
})
export class SigninComponent implements OnInit {

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
    ) {}

  ngOnInit() {
  }
  signIn(){
    console.log(this.user.usuario);
    //GlobalComponent.appUrl = this.user.usuario;
    this.authService.signIn(this.user).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
        this.buscarUser();
      },
      err => console.log(err)
    )   
  }
  buscarUser(){
    console.log("Estoy en buscar");
    this._user1Service.getUser(this.user.usuario).subscribe(
      response=>{
        // if(response.user){
           console.log(response.user);
        //   GlobalComponent.appUrl = response;
        //   console.log("exito");
        // }
        // else{
        //   console.log("fallo");
        //   console.log("Fallo en el buscarUser");
        // }
      }
    )
  }

}
