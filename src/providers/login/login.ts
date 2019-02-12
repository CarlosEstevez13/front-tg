import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class LoginProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello LoginProvider Provider');
    this.url = 'http://localhost:3002/api/';
  }

  login(usuario: string, password: string) {
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + 'login', { usuario, password }).map(res => this.getDatos(res));
  }

  private getDatos(data: any) {
    let datos = data.json();
    console.log(datos);
    if (data && datos.idUsuario) {
      sessionStorage.setItem('idUsuario', datos.idUsuario);
      sessionStorage.setItem('idDeporte', datos.idDeporte);
      sessionStorage.setItem('idRol', datos.idRol);
      sessionStorage.setItem('idEquipo', datos.idEquipo);
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('idUsuario');
    sessionStorage.removeItem('idEquipo');
    sessionStorage.removeItem('idDeporte');
    sessionStorage.removeItem('idRol');
    console.log('logout!');
  }


}
