import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthAService } from '../../services/authA.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(
    public authService: AuthService,
    public authAService: AuthAService
  ){}
  ngOnInit(): void {
    
  }

}
