import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthAService {

    private URL = 'http://localhost:3700/administrator'

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    signUp(admin:any){
        return this.http.post<any>(this.URL + '/signup', admin);
    }

    signIn(admin:any){
        return this.http.post<any>(this.URL + '/signin', admin);
    }

    loggedIn(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logOut(){
        localStorage.removeItem('token');
        this.router.navigate(['/signin'])
    }
}