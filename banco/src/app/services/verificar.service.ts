import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { GlobalComponent } from "../components/globalVar/global-component";

@Injectable({
    providedIn: 'root'
})
export class VerificarService{
    private URL = 'http://localhost:3700'

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    signIn(cliente:any){
        return this.http.post<any>(this.URL + '/signin2', cliente);
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
        this.router.navigate(['/signin'])
    }
}