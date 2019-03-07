import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';


@Injectable()
export class TorneosProvider {

  public url: string;
  public headers: Headers;

  public idTorneo:any;

  public idVer:any;

  constructor(public _http: Http) {
    console.log('Hello TorneosProvider Provider');
    this.url = 'http://192.68.1.6:3002/api/';
  }

  getTorneos() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'torneos' ).map((res:any) => res.json());
  }

  getTorneosDeporte(idDeporte) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneoDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  getNroEquiposTorneo() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'nroEquiposTorneo' ).map((res:any) => res.json());
  }
  
  getNroEquiposTorneoDeporte(idDeporte) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `nroEquiposTorneoDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  addEquipoTorneo(equipo){
    const json = JSON.stringify(equipo);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando equipo al torneo');
    console.log(params);
    return this._http.post(this.url + 'torneo_Equipo', params, {headers:this.headers})
            .map(res => res.json());
  }

  addTorneo(torneo){
    const json = JSON.stringify(torneo);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando torneo');
    console.log(params);
    return this._http.post(this.url + 'torneo', params, {headers:this.headers})
            .map(res => res.json());
  }

  setIdTorneo(id){
    this.idTorneo = id;
  }

  getIdTorneo(){
    return this.idTorneo;
  }

  //Este metodo es para diferenciar de torneos y torneos a jugar
  // 0 desde torneos
  // 1 desde torneos a jugar 
  getIdVer(){
    return this.idVer;
  }

  setIdVer(id){
    this.idVer = id;
  }

  addTor_Usuario_Rol(data){
    const json = JSON.stringify(data);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando torneo usuario rol');
    console.log(params);
    return this._http.post(this.url + 'turol', params, {headers:this.headers})
            .map(res => res.json());
  }

  putTorneo(torneo){
    console.log(torneo);
    const json = JSON.stringify(torneo);
    const params = json;
    return this._http.put(this.url + `torneo/${this.idTorneo}`, params , { headers: this.headers } ).map(res => res.json());
  }
  
  getTorneo() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneo/${this.idTorneo}` ).map((res:any) => res.json());
  }

  getTorne_Juez() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `turol/${this.idTorneo}` ).map((res:any) => res.json());
  }

  getJuez() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `juez` ).map((res:any) => res.json());
  }

  getTorneosDeEquipo(idEquipo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosDeEquipo/${idEquipo}` ).map((res:any) => res.json());
  }

  getTorneosDeEquipoD(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosDeEquipoD/${data.idEquipo}/${data.idDeporte}` ).map((res:any) => res.json());
  }

  getEquiposEnTorneo() {

    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equiposDeTorneo/${this.idTorneo}` ).map((res:any) => res.json());
  }

  deleteTorneoEquipos(idTorneo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `torneo_Equipo/${idTorneo}` ).map((res:any) => res.json());
  }

  deleteTorneoEquipo(idTorneo,idEquipo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `torneo_Equipo_1/${idTorneo}/${idEquipo}` ).map((res:any) => res.json());
  }

  deleteTorneo(idTorneo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `torneo/${idTorneo}` ).map((res:any) => res.json());
  }

  getTorneosDueno(id) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosd/${id}` ).map((res:any) => res.json());
  }

  getTorneosDuenoD(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosdDeporte/${data.idUsuario}/${data.idDeporte}` ).map((res:any) => res.json());
  }

  getDeportes() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'deportes' ).map((res:any) => res.json());
  }
}
