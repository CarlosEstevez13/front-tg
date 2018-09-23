import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the TorneosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TorneosProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello TorneosProvider Provider');
    this.url = 'http://localhost:3001/api/';
  }

  getTorneos() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'torneos' ).map((res:any) => res.json());
  }
  getNroEquiposTorneo() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'nroEquiposTorneo' ).map((res:any) => res.json());
  }
  


}
