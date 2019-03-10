import { EntrenamientoMenuPage } from './../entrenamiento-menu/entrenamiento-menu';
import { SalidasEMenuPage } from './../salidas-e-menu/salidas-e-menu';
import { SalidasIMenuPage } from './../salidas-i-menu/salidas-i-menu';
import { TorneosMenuPage } from './../torneos-menu/torneos-menu';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  idRol =sessionStorage.getItem('idRol');
  idEquipo =sessionStorage.getItem('idEquipo');

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    console.log(this.idEquipo);
  }


  getTorneos(){
    this.navCtrl.push(TorneosMenuPage);
  }

  getSalidasI(){
    this.navCtrl.push(SalidasIMenuPage);
  }

  getSalidasE(){
    this.navCtrl.push(SalidasEMenuPage);
  }

  getEntrenamiento(){
    this.navCtrl.push(EntrenamientoMenuPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

}
