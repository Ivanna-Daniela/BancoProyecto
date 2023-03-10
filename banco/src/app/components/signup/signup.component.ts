import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GlobalComponent } from '../globalVar/global-component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    usuario: '',
    password: '',
    numero:''
  }

  constructor(
    public authService: AuthService,
    private router: Router
    ){}

  ngOnInit(){
    
  }
  signUp(){
    GlobalComponent.appUrl = this.user.usuario;
    this.user.numero = GlobalComponent.appCed;
    this.authService.signUp(this.user).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    )
   
  }
  isValidPassword(): boolean {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
    return passwordRegex.test(this.user.password);
  }

}
