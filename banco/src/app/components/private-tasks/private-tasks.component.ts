import { GlobalComponent } from '../globalVar/global-component';
import { Component , OnInit} from '@angular/core';
import { Cuenta} from '../../models/cuenta';
import { CuentaService } from '../../services/cuenta.service';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';
import { Global } from '../../services/global';
@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css'],
  providers:[CuentaService,ClienteService]
})
export class PrivateTasksComponent implements OnInit{
  public email: string;
  public cuenta: Cuenta;
  public url: string;
  public cuentaBuscada: boolean = false;
  public arr: any[];
  public cliente: Cliente;
  public numero: string;
  constructor(private _cuentaService: CuentaService, private _clienteService: ClienteService) {
    this.email = GlobalComponent.appUrl ;
    this.url = Global.url;
    this.cuenta= new Cuenta('',1,'','',1,'','',1);
    this.cliente=new Cliente('','','',"",123,"","");
    this.arr = [];
    this.numero = '';
  }
    ngOnInit(): void {
      this.buscarCliente();
      console.log(GlobalComponent.appUrl);
    }

    buscarCuentas() {
      this._cuentaService.getCuentaN(this.email).subscribe(
        response=>{
          if(response.cuenta){
            this.arr=response.cuenta;
          console.log( response.cuenta);
          setTimeout(() => {
            this.cuentaBuscada = true;
          }, 3); 
          }
        },
        error=>{
          console.log(<any>error);
        }
      );
  }
  buscarCliente() {
    if (this.email !== '') {
      this._clienteService.getClienteN(this.email).subscribe(
        response => {
          if (response.cliente.length === 1) {
            this.cliente = response.cliente[0];
            console.log(response.cliente[0]); 
          } else {
            this.cliente=new Cliente('','','',"",123,"","");
          }
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

}
