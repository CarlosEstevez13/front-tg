import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the SalidaEProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SalidaEProvider {

  public url: string;
  public headers: Headers;
  public idSalidaE:any;
  public idVer:any;

  idDeporte = sessionStorage.getItem('idDeporte');
  idEquipo = sessionStorage.getItem('idEquipo');

  constructor(public _http: Http) {
    console.log('Hello SalidaEProvider Provider');
    this.url = 'http://localhost:3002/api/';
  }

  //Este metodo es para diferenciar de salidasE y salidasE a jugar
  // 0 desde salidasE
  // 1 desde salidasE a jugar 
  getIdVer(){
    return this.idVer;
  }

  setIdVer(id){
    this.idVer = id;
  }

  getSalidasDeporte(idDeporte) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaEDeporte/${idDeporte}` ).map((res:any) => res.json());
  }

  addSalida(salida){
    const json = JSON.stringify(salida);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando salidaE');
    console.log(params);
    return this._http.post(this.url + 'salidaE', params, {headers:this.headers})
            .map(res => res.json());
  }

  addSalidaEquipo(salida){
    const json = JSON.stringify(salida);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando salidaE');
    console.log(params);
    return this._http.post(this.url + 'salidaE_Equipo', params, {headers:this.headers})
            .map(res => res.json());
  }

  //Este metodo devuelve las salidas en las que el equipo se puede inscribir
  getSalidasEInscribirse(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaEInscribirse/${this.idDeporte}/${this.idEquipo}` ).map((res:any) => res.json());
  }

  getSalidaE(){
    return this.idSalidaE;
  }

  setSalidaE(idSalidaE){
    this.idSalidaE = idSalidaE;
  }

  getSalida() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaE/${this.idSalidaE}` ).map((res:any) => res.json());
  }

  getEquiposSalida() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasE_EquipoMarcador/${this.idSalidaE}` ).map((res:any) => res.json());
  }

  

  getMisSalidas(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasE_EquipoMisSalidas/${data.idEquipo}/${data.idDeporte}` ).map((res:any) => res.json());
  }
  //obtiene las salidas que aun no tienen rival
  getMisSalidas_1(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasE_EquipoMisSalidas_1/${data.idEquipo}/${data.idDeporte}` ).map((res:any) => res.json());
  }

  getSalidasJugar(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasE_EquipoJugar/${data.idEquipo}/${data.idDeporte}` ).map((res:any) => res.json());
  }

  getSalidasHistorial(data) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasE_EquipoHistorial/${data.idEquipo}/${data.idDeporte}` ).map((res:any) => res.json());
  }
  
  deleteSalidaEquipos(idSalida) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `SalidaE_Equipo/${idSalida}` ).map((res:any) => res.json());
  }

  deleteSalidaEquipo(idSalida,idEquipo) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `SalidaE_Equipo_1/${idSalida}/${idEquipo}` ).map((res:any) => res.json());
  }

  deleteSalida(idSalida) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `SalidaE/${idSalida}` ).map((res:any) => res.json());
  }

  putSalida(salida){
    console.log(salida);
    console.log(this.idSalidaE);
    const json = JSON.stringify(salida);
    const params = json;
    return this._http.put(this.url + `salidaE/${this.idSalidaE}`, params , { headers: this.headers } ).map(res => res.json());
  }

  putMarcador(data){
    console.log(data);
    const json = JSON.stringify(data);
    const params = json;
    return this._http.put(this.url + `salidaEMarcador/${this.idSalidaE}`, params , { headers: this.headers } ).map(res => res.json());
  }
}
