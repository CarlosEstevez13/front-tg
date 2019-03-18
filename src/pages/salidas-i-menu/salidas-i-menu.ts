import { SalidasIPage } from './../salidas-i/salidas-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InscritoSalidaIPage } from '../inscrito-salida-i/inscrito-salida-i';
import { MisSalidasIPage } from '../mis-salidas-i/mis-salidas-i';
import { CrearSalidaIPage } from '../crear-salida-i/crear-salida-i';

/**
 * Generated class for the SalidasIMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas-i-menu',
  templateUrl: 'salidas-i-menu.html',
})
export class SalidasIMenuPage {

  idRol:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.idRol = sessionStorage.getItem('idRol');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalidasIMenuPage');
  }

  getBuscarSalidaI(){
    this.navCtrl.push(SalidasIPage);
  }

  getSalidaIRegistradas(){
    this.navCtrl.push(InscritoSalidaIPage);
  }

  getMisSalidas(){
    this.navCtrl.push(MisSalidasIPage);
  }

  getCrearSalida(){
    this.navCtrl.push(CrearSalidaIPage);
  }

}
