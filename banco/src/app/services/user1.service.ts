import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class User1Service{
    public url:String;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
  
        getUser(usuario:String):Observable<any>{
            let headers=new HttpHeaders().set('Content-Type','application/json');
            console.log("Estoy en el sevicio");
            return this._http.get(this.url+'/uniqueuser/'+usuario,{headers:headers});
        }
}