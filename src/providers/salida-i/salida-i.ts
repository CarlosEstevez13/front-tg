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
    this.url = 'http://10.14.21.84:3002/api/';
  }

  getSalidasDisponibles(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidasIQueNoEsta/${index}` ).map((res:any) => res.json());
  }

  getSalidasDisponiblesDeport(index:number,idDeporte:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `SalidasIQueNoEstaDeport/${index}/${idDeporte}` ).map((res:any) => res.json());
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

  getMisSalidas(index:number){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `salidaIU/${index}` ).map((res:any) => res.json());
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
    return this._http.delete(this.url + `salidaI/${idSalida}` ).map((res:any) => res.json());
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
