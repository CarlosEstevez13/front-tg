import { CrearEventoPage } from './../crear-evento/crear-evento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

}
