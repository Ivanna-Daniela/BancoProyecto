import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private URL = ''

    constructor(
        private http: HttpClient,
        private router: Router,
    ){}

    signIn(cliente:any){
        return this.http.post<any>(this.URL + '/signin', cliente);
    }

}