import { MisSalidasEPage } from './../mis-salidas-e/mis-salidas-e';
import { CrearSalidaEPage } from './../crear-salida-e/crear-salida-e';
import { SalidasEPage } from './../salidas-e/salidas-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InscritoSalidaEPage } from '../inscrito-salida-e/inscrito-salida-e';

@IonicPage()
@Component({
  selector: 'page-salidas-e-menu',
  templateUrl: 'salidas-e-menu.html',
})
export class SalidasEMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalidasEMenuPage');
  }

  getBuscarSalidasE(){
    this.navCtrl.push(SalidasEPage);
  }

  getSalidasEInscritos(){
    this.navCtrl.push(InscritoSalidaEPage);
  }
  
  getCrearSalidasE(){
    this.navCtrl.push(CrearSalidaEPage);
  }

  getMisSalidasE(){
    this.navCtrl.push(MisSalidasEPage);
  }

}
