import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
import { AuthAService } from 'src/app/services/authA.service';


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
  public actualizacionExitosa: boolean = false; // add this variable

  constructor(
    private _clienteService: ClienteService,
    public authAService: AuthAService
    
    ) {
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
    this.actualizacionExitosa = false;
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
        console.log('Cliente actualizado:', response.clienteActualizado);
        this.actualizacionExitosa = true; // set the flag to true when client is updated
        this.editMode = false; 
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  borrarCliente(id: string) {
    if (confirm('¿Está seguro de que desea borrar este cliente?')) {
      this._clienteService.deleteCliente(id).subscribe(
        response => {
          console.log('Cliente borrado:', response.clienteBorrado);
          this.getClientes(); // refresh the client list
          this.cliente=new Cliente('','','',"",123,"",""); // clear the search results
          this.clienteBuscado = false; // reset the search flag
          this.editMode = false; // disable edit mode
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }
  

}
