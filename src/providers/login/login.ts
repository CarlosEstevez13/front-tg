import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';



@Injectable()
export class LoginProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello LoginProvider');
    this.url = 'http://10.8.80.47:3002/api/';
  }

  login(usuario: string, password: string) {
    console.log('hola1');
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + 'login', { usuario, password }).map(res => this.getDatos(res));
  }

  registro(usuario:any){
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + 'usuario', { usuario }).map(res => res.json());
  }

  registroRol(idUsuario,rol){
    this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this._http.post(this.url + 'urol', { idUsuario,rol }).map(res => res.json());
  }
  registroURD(data:any){
    console.log(data);
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post(this.url + 'urdeporte',  data ,{headers:this.headers}).map(res => res.json());
  }

  getDeportes(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'deportes' ).map((res:any) => res.json());
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
