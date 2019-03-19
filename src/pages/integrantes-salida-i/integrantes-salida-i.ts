import { PerfilPage } from './../perfil/perfil';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { SalidaIProvider } from './../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IntegrantesSalidaIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-integrantes-salida-i',
  templateUrl: 'integrantes-salida-i.html',
})
export class IntegrantesSalidaIPage {
  integrantes: any;
  idSalida:any

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public _salidaIprovider : SalidaIProvider,
               public EquipoProvider: EquipoProvider) {
              this.idSalida = sessionStorage.getItem('idSalidaI')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntegrantesSalidaIPage');
    this._salidaIprovider.getPaticipantes(this.idSalida)
      .subscribe(
        res=>{
          this.integrantes = res.result;
          console.log(this.integrantes);
        },
        e=>{
          console.log(e);
        }
      )

  }

  verUsuario(idUsuario:any){
    this.EquipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }

}
