import { PerfilPage } from './../perfil/perfil';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';

@IonicPage()
@Component({
  selector: 'page-integrantes',
  templateUrl: 'integrantes.html',
})
export class IntegrantesPage {

  integrantes: any;
  idEquipo:any;

  constructor(public navCtrl: NavController, 
              private equipoProvider: EquipoProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntegrantesPage');
  }

  ionViewWillLoad() {
    this.idEquipo = sessionStorage.getItem('idEquipo');
    this.equipoProvider.getIntegrantes(this.idEquipo)
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

  verUsuario(idUsuario){
    this.equipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }

}
