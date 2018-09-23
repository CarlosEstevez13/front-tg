import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EquipoProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello EquipoProvider Provider');
    this.url = 'http://localhost:3001/api/';
  }

  getEquipos(idDeporte:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equiposDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  getNroIntEquipos(idDeporte:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `nroIntEquiposDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

}
