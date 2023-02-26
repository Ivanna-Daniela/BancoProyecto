import {Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Cliente } from "../models/cliente";
import { Global } from "./global";
import { Observable } from 'rxjs';

@Injectable()
export class ClienteService{
    public url:string;
    constructor(
        private _http:HttpClient
    ){
        this.url=Global.url;
    }

    getClientes():Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/clientes',{headers:headers});
    }

    //guardar pelicula
    //http://localhost:3700/guardar-pelicula
    guardarCliente(cliente:Cliente):Observable<any>{
        let params=JSON.stringify(cliente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/guardarCliente',params,{headers:headers});
    }


    //ver pelicula
    //http://localhost:3700/pelicula/:id
    getClienteN(numero:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/encontrarCliente/'+numero,{headers:headers});
    }

    getCliente(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/cliente/'+id,{headers:headers});
    }

    //editar pelicula
    //http://localhost:3700/editar/:id
    updateClientes(cliente:Cliente):Observable<any>{
        let params=JSON.stringify(cliente);
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url+'/editarCliente/'+cliente._id,params,{headers:headers});
    }
    //eliminar pelicula
    //http://localhost:3700/pelicula/:id
    deleteCliente(id:string):Observable<any>{
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.delete(this.url+'/borrarCliente/'+id,{headers:headers});
    }

    sendEmail(correo:string, password:string, nombre:string):Observable<any>{
        let body={correo,password,nombre};
        let headers=new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url + '/sendEmail', body, { headers });
    }

}