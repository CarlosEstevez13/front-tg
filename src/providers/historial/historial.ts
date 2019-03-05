import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HistorialProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistorialProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello HistorialProvider Provider');
    this.url = 'http://10.14.21.84:3002/api/';
  }

  getHistorial(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaiHistorial/${index}` ).map((res:any) => res.json());
  }

  getSalida(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaI/${index}` ).map((res:any) => res.json());
  }

  getaEstadis(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaIURD/${index}` ).map((res:any) => res.json());
  }
  
}
