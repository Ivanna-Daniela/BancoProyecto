import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { GlobalComponent } from "../components/globalVar/global-component";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private URL = '/api'

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    signUp(user:any){
        GlobalComponent.appUrl = "";
        return this.http.post<any>(this.URL + '/signup', user);
    }

    signIn(user:any){
        return this.http.post<any>(this.URL + '/signin', user);
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logOut(){
        localStorage.removeItem('token');
        GlobalComponent.appUrl = "";
        GlobalComponent.appCed="";
        GlobalComponent.appId="";
        this.router.navigate(['/signin'])
    }

}