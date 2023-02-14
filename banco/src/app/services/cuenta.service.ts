import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cuenta } from "../models/cuenta";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class CuentaService{
    public url:String;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }
    //ver todas las cuentas
    //http://localhost:3700/cuentas
    getCuentas():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'cuentas',{headers:headers});
    }
    //guardar cuenta
    //http://localhost:3700/guardar-cuenta
    guardarCuenta(cuenta:Cuenta):Observable<any>{
        let params=JSON.stringify(cuenta);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'guardar-cuenta',params,{headers:headers});
    }
    //ver cuenta
    //http://localhost:3700/cuenta/:id
    getCuenta(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'cuenta/'+id,{headers:headers});
    }
    //editar cuenta
    //http://localhost:3700/cuenta/:id
    updatePeliculas(cuenta:Cuenta):Observable<any>{
        let params=JSON.stringify(cuenta);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'pelicula/'+cuenta._id,params,{headers:headers});
    }
    //eliminar cuenta
    //http://localhost:3700/cuenta/:id
    deleteCuenta(id:String):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'cuenta/'+id,{headers:headers});
    }
}