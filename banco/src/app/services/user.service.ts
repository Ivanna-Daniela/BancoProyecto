import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private URL = 'http://localhost:3700'

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    signIn(cliente:any){
        return this.http.post<any>(this.URL + '/signin', cliente);
    }

}