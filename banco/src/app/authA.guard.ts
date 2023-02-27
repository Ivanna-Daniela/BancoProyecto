import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthAService } from './services/authA.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthAGuard implements CanActivate {

  constructor(
    private authAService: AuthAService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.authAService.loggedInA()) {
      return true;
    }

    this.router.navigate(['/signinA']);
    return false;
  }

}