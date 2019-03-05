import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';

/**
 * Generated class for the AgregarIntegrantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar-integrante',
  templateUrl: 'agregar-integrante.html',
})
export class AgregarIntegrantePage {

  solicitudes:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _equipoService: EquipoProvider) {
                this.solicitudes = this._equipoService.getCacheSolEquipo();
                let temp:any =[];
                for(let i of this.solicitudes){
                  if(i.estado==2){
                    temp.push(i);
                  }
                }
                this.solicitudes = temp;
                console.log(this.solicitudes);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarIntegrantePage');
  }

  aceptar(solicitud:any, i:any){
    this._equipoService.deleteSolEquipo(solicitud.idSolicitud)
        .subscribe(
          res=>{
            console.log(res);
          },
          e=>{
            console.log(e);
          }
        );
    let integrante = {
      idUsuario:solicitud.idUsuario,
      idRol: 1, //deportista,
      idEquipo: sessionStorage.getItem('idEquipo')
    };
    this._equipoService.addIntegrante(integrante, solicitud.idUsuario)
        .subscribe(
          res=>{
            console.log(res);
            this.solicitudes.splice(i,1);
          },
          e=>{
            console.log(e);
          }
        );
    
  }

  rechazar(solicitud:any, i:any){
    this._equipoService.deleteSolEquipo(solicitud.idSolicitud)
    .subscribe(
      res=>{
        console.log(res);
      },
      e=>{
        console.log(e);
      }
    );
    this.solicitudes.splice(i,1);
  }

  verUsuario(idUsuario){
    this._equipoService.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }

}
