import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthAService {

    private URL = '/administrator'

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    /*signUp(admin:any){
        return this.http.post<any>(this.URL, admin);
    }*/

    signInA(admin:any){
        return this.http.post<any>(this.URL + '/signinA', admin);
    }

    loggedInA(){
        return !!localStorage.getItem('token');
    }

    getToken(){
        return localStorage.getItem('token');
    }

    logOutA(){
        localStorage.removeItem('token');
        this.router.navigate(['/signin'])
    }
}