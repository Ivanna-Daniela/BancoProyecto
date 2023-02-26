import { Component , OnInit} from '@angular/core';
import { Cuenta} from '../../models/cuenta';
import { CuentaService } from '../../services/cuenta.service';
import { Global } from '../../services/global';
@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.component.html',
  styleUrls: ['./cuentas.component.css'],
  providers:[CuentaService]
})
export class CuentasComponent implements OnInit{
  public cuentas: Cuenta[];
  public url: string;
  public cliente: string;
  public cuenta: Cuenta;
  public editMode: boolean = false;
  public cuentaBuscada: boolean = false;
  public actualizacionExitosa: boolean = false;

  constructor(private _cuentaService: CuentaService) {
    this.url = Global.url;
    this.cuentas = [];
    this.cuenta= new Cuenta('',1,'','',1,'','',1);
    this.cliente = "";
  }

  ngOnInit(): void {
    this.getCuentas();
    this.cliente = '';
  }

  getCuentas() {
    this._cuentaService.getCuentas().subscribe(
      response => {
        if (response.cuentas) {
          this.cuentas = response.cuentas;
          console.log(response.cuentas)
        }
      },
      error => {
        console.log(this.url);
        console.log(<any>error);
      }
    );
  }

  buscarCuenta() {
    this.actualizacionExitosa = false;
    if (this.cliente !== '') {
      this._cuentaService.getCuentaN(this.cliente).subscribe(
        response => {
          if (response.cuenta.length === 1) {
            this.cuenta = response.cuenta[0];
            console.log(response.cuenta[0]);
            setTimeout(() => {
              this.cuentaBuscada = true;
            }, 3); 
          } else {
            this.cuenta=new Cuenta('',1,'','',1,'','',1);
            this.cuentaBuscada = true; // set the flag to true when client is found
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
    this._cuentaService.updateCuenta(this.cuenta).subscribe(
      response => {
        console.log('Cuenta actualizado:', response.cuentaActualizada);
        this.actualizacionExitosa = true; // set the flag to true when client is updated
        this.editMode = false; 
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  borrarCuenta(id: string){
    if (confirm('¿Está seguro de que desea borrar este cliente?')) {
      this.cuenta.estado = 'INACTIVO';
      this._cuentaService.updateCuenta(this.cuenta).subscribe(
        response => {
          console.log('Cliente borrado:', response.clienteBorrado);
          this.getCuentas(); // refresh the client list
          this.cuenta=new Cuenta('',1,'','',1,'','',1);
          this.cuentaBuscada = false; // reset the search flag
          this.editMode = false; // disable edit mode
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

}


