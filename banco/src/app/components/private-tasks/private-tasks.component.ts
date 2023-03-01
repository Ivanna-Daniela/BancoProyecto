import { GlobalComponent } from '../globalVar/global-component';
import { Component , OnInit} from '@angular/core';
import { Cuenta} from '../../models/cuenta';
import { CuentaService } from '../../services/cuenta.service';
import { AuthAService } from 'src/app/services/authA.service';
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
  constructor(
    private _cuentaService: CuentaService, 
    private _clienteService: ClienteService,
    public authAService: AuthAService
    ) {
    this.email = GlobalComponent.appUrl ;
    this.url = Global.url;
    this.cuenta= new Cuenta('',1,'','',1,'','',1);
    this.cliente=new Cliente('','','',"",123,"","");
    this.arr = [];
    this.numero = '';
  }
    ngOnInit(): void {
      this.buscarCliente();
    }

    buscarCuentas() {
      this._cuentaService.getCuentaN(GlobalComponent.appUrl).subscribe(
        response=>{
          if(response.cuenta){
            this.arr=response.cuenta;
            console.log("Estoy en buscar priv-cuentas");
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
            console.log("Estoy en buscar priv-cliente"); 
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
