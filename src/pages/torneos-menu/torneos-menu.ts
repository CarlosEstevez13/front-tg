import { TorneosPatrocinarPage } from './../torneos-patrocinar/torneos-patrocinar';
import { TorneosArbitrarPage } from './../torneos-arbitrar/torneos-arbitrar';
import { MisTorneosPage } from './../mis-torneos/mis-torneos';
import { CrearTorneoPage } from './../crear-torneo/crear-torneo';
import { InscritoTorneoPage } from './../inscrito-torneo/inscrito-torneo';
import { TorneosPage } from './../torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TorneosMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-torneos-menu',
  templateUrl: 'torneos-menu.html',
})
export class TorneosMenuPage {

  idRol =sessionStorage.getItem('idRol');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TorneosMenuPage');
  }

  getBuscarTorneo(){
    this.navCtrl.push(TorneosPage);
  }

  getTorneosInscritos(){
    this.navCtrl.push(InscritoTorneoPage);
  }
  
  getCrearTorneo(){
    this.navCtrl.push(CrearTorneoPage);
  }

  getMisTorneos(){
    this.navCtrl.push(MisTorneosPage);
  }

  getTorneosArbitrar(){
    this.navCtrl.push(TorneosArbitrarPage);
  }
  getTorneosPatrocinar(){
    this.navCtrl.push(TorneosPatrocinarPage);
  }

}
