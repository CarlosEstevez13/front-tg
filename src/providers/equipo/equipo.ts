import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EquipoProvider {

  public url: string;
  public headers: Headers;


  public equipo:any;
  public solEquipo:any;
  public idEquipo:any;
  public idUsuario:any;

  constructor(public _http: Http) {
    console.log('Hello EquipoProvider Provider');
    this.url = 'http://10.14.41.222:3002/api/';
  }

  getEquipos(idDeporte:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equiposDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  getEquipos1() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equipos/` ).map((res:any) => res.json());
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

  getIntegrantes(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `integrantes/${idEquipo}` ).map((res:any) => res.json());
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
    console.log('agregando mensaje');
    console.log(params);
    return this._http.post(this.url + 'mensaje', params, {headers:this.headers})
            .map(res => res.json());
  }

  addEquipo(equipo){
    const json = JSON.stringify(equipo);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando equipo');
    console.log(params);
    return this._http.post(this.url + 'equipo', params, {headers:this.headers})
            .map(res => res.json());
  }

  getIdEquipo(){
    return this.idEquipo;
  }

  setIdEquipo(id){
    this.idEquipo = id;
    console.log('se guardo idEquipo ' + this.idEquipo);
  }

  getIdUsuario(){
    return this.idUsuario;
  }

  setIdUsuario(id){
    this.idUsuario = id;
    console.log('se guardo idUsuario ' + this.idUsuario);
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
  //obtiene la info con el numero de integrantes
  getInfoEquipo_1(idEquipo:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equipo_1/${idEquipo}` ).map((res:any) => res.json());
  }

  getEquipoUsuario(idUsuario){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `usuarioGetEquipo/${idUsuario}` ).map((res:any) => res.json());
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

  deleteEquipo( idEquipo:any){
    return this._http.delete(this.url + `equipo/${idEquipo}` , { headers: this.headers } ).map(res => res.json());
  }

}
