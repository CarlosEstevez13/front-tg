import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  public url: string;
  public headers: Headers;

  constructor(public _http: Http ) {
    console.log('Hello UsuarioProvider Provider');
    this.url = 'http://10.8.80.47:3002/api/';
  }

  getUsuario(index){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `usuario/${index}` ).map((res:any) => res.json());
  }

  getRendimientos(idU){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `rendimientos/${idU}` ).map((res:any) => res.json());
  }

  getNotificacionesU(index){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `notificacionesU/${index}` ).map((res:any) => res.json());
  }

  addRendimiento(rendimiento){
    const json = JSON.stringify(rendimiento);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando rendimiento');
    console.log(params);
    return this._http.post(this.url + 'rendimiento', params, {headers:this.headers})
            .map(res => res.json());
  }

  addNotificacion(notificacion){
    const json = JSON.stringify(notificacion);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando notificacion');
    console.log(params);
    return this._http.post(this.url + 'notificacion', params, {headers:this.headers})
            .map(res => res.json());
  }


  putNotificacion(index:number){
    return this._http.put(this.url + `/notificacion/${index}`, {headers:this.headers})
            .map(res => res.json());
  }

  getRoles(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `roles/` ).map((res:any) => res.json());
  }

  getUsuarios(){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `urolesadmin/` ).map((res:any) => res.json());
  }

  getUsuariosR(idRol:any){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `urolesadminr/${idRol}` ).map((res:any) => res.json());
  }

  putUsuario(index:number, formulario:any){
    const json = JSON.stringify(formulario);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando integrante');
    console.log(params);
    return this._http.put(this.url + `/usuario/${index}`, params, {headers:this.headers})
            .map(res => res.json());
  }

  putFotoUsuario(index:number, imagen:any){
    const json = JSON.stringify(imagen);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('agregando integrante');
    console.log(params);
    return this._http.put(this.url + `/usuarioFoto/${index}`, params, {headers:this.headers})
            .map(res => res.json());
  }

  deleteUsuario(idUsuario) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    //return this._http.delete(this.url + `usuario/${idUsuario}` ).map((res:any) => res.json());
    return this._http.put(this.url + `usuarioActivo/${idUsuario}` , { headers: this.headers } ).map(res => res.json());
  }

  recuperar(email:any){
    this.headers = new Headers({'Content-Type': 'application/json'});
    return this._http.get(this.url + `recuperar/${email}` ).map((res:any) => res.json());
  }

  validar(formulario:any){
    const json = JSON.stringify(formulario);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('validando');
    console.log(params);
    return this._http.post(this.url + 'validarUsu', params, {headers:this.headers})
            .map(res => res.json());
  }

  cambiarPass(formulario:any){
    const json = JSON.stringify(formulario);
    const params = json;
    this.headers = new Headers({'Content-Type': 'application/json'});
    console.log('validando');
    console.log(params);
    return this._http.post(this.url + 'cambiarPass', params, {headers:this.headers})
            .map(res => res.json());
  }


}
