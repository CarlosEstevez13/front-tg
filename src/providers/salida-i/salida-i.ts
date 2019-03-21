import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SalidaIProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SalidaIProvider {

  public url: string;
  public headers: Headers;
  public idSalida: any;

  constructor(public _http: Http) {
    console.log('Hello SalidaIProvider Provider');
    this.url = 'http://10.8.80.47:3002/api/';
  }

  getSalidas() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasI` ).map((res:any) => res.json());
  }
  getPaticipantes(index:number) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `integrantesSalida/${index}` ).map((res:any) => res.json());
  }

  getEntrenamientos() {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `entrenamientos` ).map((res:any) => res.json());
  }

  getDeportes(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `deportes` ).map((res:any) => res.json());
  }

  getSalidasDisponibles(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasIQueNoEsta/${index}` ).map((res:any) => res.json());
  }

  getSalidasDisponiblesEntre(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `SalidasIQueNoEstaEntre/${index}` ).map((res:any) => res.json());
  }

  getDeporte(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `deportes` ).map((res:any) => res.json());
  }
  
  getverSalidaI(idSalidai:any){
    this.idSalida=idSalidai;
  }

  getSalidaI(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaI/${index}` ).map((res:any) => res.json());
    
  }

  addSalidaIUsuario(salida:any){
    const json = JSON.stringify(salida);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando salidaI');
    console.log(params);
    return this._http.post(this.url + 'salidaIURD', params, {headers:this.headers})
            .map(res => res.json());
  }

  getSalidasIAJugar(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasIAJugar/${index}` ).map((res:any) => res.json());
  }

  getSalidasIAJugarEntre(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasIAJugarEntre/${index}` ).map((res:any) => res.json());
  }
  
  getMisSalidas(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaIU/${index}` ).map((res:any) => res.json());
  }

  getMisEntrenamientos(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaIUEntre/${index}` ).map((res:any) => res.json());
  }
  
  putSalida(salida:any,index:number){
    console.log(salida);
    const json = JSON.stringify(salida);
    const params = json;
    return this._http.put(this.url + `salidaI/${index}`, params , { headers: this.headers } ).map(res => res.json());
  }

  addSalida(salida:any){
    const json = JSON.stringify(salida);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando salidaI');
    console.log(params);
    return this._http.post(this.url + 'salidaI', params, {headers:this.headers})
            .map(res => res.json());
  }

  deleteSalidaI(idSalida:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    //return this._http.delete(this.url + `salidaI/${idSalida}` ).map((res:any) => res.json());
    return this._http.put(this.url + `salidaIActivo/${idSalida}` , { headers: this.headers } ).map(res => res.json());
  }

  deleteSalidaIUsuario(idSalida:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `salidaIURD/${idSalida}` ).map((res:any) => res.json());
  }

  deleteSalidaIU(idSalida:any,idUsuario:any) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.delete(this.url + `salidaIU/${idSalida}/${idUsuario}` ).map((res:any) => res.json());
  }

  
}
