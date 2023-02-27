import { Component, OnInit } from '@angular/core';
import { AuthAService } from 'src/app/services/authA.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  admin = {
    email:'',
    password:''
  }
  constructor(
    private authAService : AuthAService,
    private router : Router
  ){}

  ngOnInit() {
    
  }
  signInA(){
    this.authAService.signInA(this.admin).subscribe(
      res =>{
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/privateA']);
      },
      err => console.log(err)
    )
    
  }
}
