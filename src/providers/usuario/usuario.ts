import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http ) {
    console.log('Hello UsuarioProvider Provider');
    this.url = 'http://localhost:3002/api/';
  }

  getUsuario(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `usuario/${index}` ).map((res:any) => res.json());
  }
}
