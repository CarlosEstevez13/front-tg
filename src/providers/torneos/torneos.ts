import { Http, Headers } from '@angular/http';
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

  public idTorneo:any;

  constructor(public _http: Http) {
    console.log('Hello TorneosProvider Provider');
    this.url = 'http://localhost:3002/api/';
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

  getTorneosDeEquipo(idEquipo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosDeEquipo/${idEquipo}` ).map((res:any) => res.json());
  }

  getEquiposEnTorneo() {

    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `equiposDeTorneo/${this.idTorneo}` ).map((res:any) => res.json());
  }

  deleteTorneoEquipos(idTorneo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `torneo_Equipo/${idTorneo}` ).map((res:any) => res.json());
  }

  deleteTorneo(idTorneo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `torneo/${idTorneo}` ).map((res:any) => res.json());
  }

  getTorneosDueno(id) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosd/${id}` ).map((res:any) => res.json());
  }

  getDeportes() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + 'deportes' ).map((res:any) => res.json());
  }
}
