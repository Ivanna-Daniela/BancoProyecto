import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers:[ClienteService]
})
export class ClientesComponent implements OnInit {
  public clientes: Cliente[];
  public url: string;
  public numero: string;
  public cliente: Cliente;
  public clienteBuscado: boolean = false;
  public editMode: boolean = false;

  constructor(private _clienteService: ClienteService) {
    this.url = Global.url;
    this.clientes = [];
    this.numero = '';
    this.cliente=new Cliente('','','',"",123,"","");
  }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes() {
    this._clienteService.getClientes().subscribe(
      response => {
        if (response.clientes) {
          this.clientes = response.clientes;
        }
      },
      error => {
        console.log(this.url);
        console.log(<any>error);
      }
    );
  }

  buscarCliente() {
    if (this.numero !== '') {
      this._clienteService.getClienteN(this.numero).subscribe(
        response => {
          if (response.cliente.length === 1) {
            this.cliente = response.cliente[0];
            console.log(response.cliente[0]);
            setTimeout(() => {
              this.clienteBuscado = true;
            }, 3); 
          } else {
            this.cliente=new Cliente('','','',"",123,"","");
            this.clienteBuscado = true; // set the flag to true when client is found
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  enableEditMode() {
    this.editMode = true;
  }

  guardarCambios() {
    this._clienteService.updateClientes(this.cliente).subscribe(
      response => {
        // Do something with the response, e.g. show a success message
        console.log('Cliente actualizado:', response.clienteActualizado);
        this.editMode = false; // disable edit mode after saving changes
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  

  
}
