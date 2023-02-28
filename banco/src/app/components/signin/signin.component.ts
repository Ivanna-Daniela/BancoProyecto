import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AuthAService } from '../../services/authA.service';
import { GlobalComponent } from '../globalVar/global-component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
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
    private router: Router
    ) {}

  ngOnInit() {
    
  }
  signIn(){
    console.log(this.user.usuario);
    GlobalComponent.appUrl = this.user.usuario;
    this.authService.signIn(this.user).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/private']);
      },
      err => console.log(err)
    )
    
  }

}
