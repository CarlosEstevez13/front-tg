import { TorneosPage } from './../torneos/torneos';
import { CrearEventoPage } from './../crear-evento/crear-evento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { SalidasIPage } from '../salidas-i/salidas-i';
import { SalidasEPage } from '../salidas-e/salidas-e';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  crearEvento() {
    const modal = this.modalCtrl.create(CrearEventoPage);
    modal.present();
  }

  getTorneos(){
    this.navCtrl.push(TorneosPage);
  }

  getSalidasI(){
    this.navCtrl.push(SalidasIPage);
  }

  getSalidasE(){
    this.navCtrl.push(SalidasEPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

}
