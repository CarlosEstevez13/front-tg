import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EquipoProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http) {
    console.log('Hello EquipoProvider Provider');
    this.url = 'http://localhost:3002/api/';
  }

  getEquipos(idDeporte:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equiposDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  getNroIntEquipos(idDeporte:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `nroIntEquiposDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  addSolicitud(solicitud){
    const json = JSON.stringify(solicitud);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando solicitud');
    console.log(params);
    return this._http.post(this.url + 'solicitud', params, {headers:this.headers})
            .map(res => res.json());
  }

  getSolicitudesUsuario(idUsuario:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `solUsuario/${idUsuario}` ).map((res:any) => res.json());
  }

  getMensajesEquipo(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `mensajeE/${idEquipo}` ).map((res:any) => res.json());
  }

  addMensaje(mensaje){
    const json = JSON.stringify(mensaje);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando solicitud');
    console.log(params);
    return this._http.post(this.url + 'mensaje', params, {headers:this.headers})
            .map(res => res.json());
  }

  getInfoEquipo(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equipo/${idEquipo}` ).map((res:any) => res.json());
  }


}
