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

  constructor(private _cuentaService: CuentaService) {
    this.url = Global.url;
    this.cuentas = [];
  }

  ngOnInit(): void {
    this.getCuentas();
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
}
