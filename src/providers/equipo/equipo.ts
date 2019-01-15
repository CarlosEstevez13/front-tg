import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EquipoProvider {

  public url: string;
  public headers: Headers;


  public equipo:any;
  public solEquipo:any;

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
  
  getSolicitudesEquipo(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `solEquipo/${idEquipo}` ).map((res:any) => res.json());
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

  addIntegrante(integrante, idUsuario){
    const json = JSON.stringify(integrante);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando integrante');
    console.log(params);
    return this._http.put(this.url + `/urdeporte/${idUsuario}`, params, {headers:this.headers})
            .map(res => res.json());
  }

  getInfoEquipo(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equipo/${idEquipo}` ).map((res:any) => res.json());
  }

  cacheEquipo(equipo){
    this.equipo = equipo;
  }

  cacheSolicitudesEquipo(solEquipo){
    this.solEquipo = solEquipo;
  }
  getCacheSolEquipo(){
    return this.solEquipo;
  }

  getCacheEquipo(){
    return this.equipo;
  }
  putEquipo(equipo:any, idEquipo:any){
    console.log(equipo);
    const json = JSON.stringify(equipo);
    const params = json;
    return this._http.put(this.url + `equipo/${idEquipo}`, params , { headers: this.headers } ).map(res => res.json());
  }

  deleteSolEquipo( idSolicitud:any){
    return this._http.delete(this.url + `solicitud/${idSolicitud}` , { headers: this.headers } ).map(res => res.json());
  }

}
