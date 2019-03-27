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
    this.url = 'http://10.8.80.47 :3002/api/';
  }

  getTorneos(idU,idE) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `turoles/${idU}/${idE}` ).map((res:any) => res.json());
  }

  getTorneosAPatrocinar(idU){
    return this._http.get(this.url + `torneosAPatrocinar/${idU}` ).map((res:any) => res.json());
  }

  getTorneosIndividuales(idU) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosIndividuales/${idU}` ).map((res:any) => res.json());
  }

  getTorneosArbitrar(idU) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosArbitrar/${idU}` ).map((res:any) => res.json());
  }

  getTorneosPatrocinar(idU) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneosPatrocinar/${idU}` ).map((res:any) => res.json());
  }

  getTorneosAdmin() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneos/` ).map((res:any) => res.json());
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

  addJuez(data){
    const json = JSON.stringify(data);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando juez');
    console.log(params);
    return this._http.post(this.url + 'juez', params, {headers:this.headers})
            .map(res => res.json());
  }

  addPatrocinador(data){
    const json = JSON.stringify(data);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando patrocinador');
    console.log(params);
    return this._http.post(this.url + 'patrocinador', params, {headers:this.headers})
            .map(res => res.json());
  }

  putTorneo(torneo){
    console.log(torneo);
    const json = JSON.stringify(torneo);
    const params = json;
    return this._http.put(this.url + `torneo/${this.idTorneo}`, params , { headers: this.headers } ).map(res => res.json());
  }

  getSolicitudEnviada(idUsuario) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `solicitudEnviada/${idUsuario}/${this.idTorneo}` ).map((res:any) => res.json());
  }
  
  getTorneo() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `torneo/${this.idTorneo}` ).map((res:any) => res.json());
  }

  getTorne_Juez() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `juez/${this.idTorneo}` ).map((res:any) => res.json());
  }

  getTorneo_Patrocinador() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `patrocinadores/${this.idTorneo}` ).map((res:any) => res.json());
  }

  getTorneoI_Participantes() {
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

  getUsuariosEnTorneo() {

    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `turol/${this.idTorneo}` ).map((res:any) => res.json());
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
    //return this._http.delete(this.url + `torneo/${idTorneo}` ).map((res:any) => res.json());
    return this._http.put(this.url + `TorneoActivo/${idTorneo}` , { headers: this.headers } ).map(res => res.json());
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
