import { SalidasEMenuPage } from './../salidas-e-menu/salidas-e-menu';
import { SalidasIMenuPage } from './../salidas-i-menu/salidas-i-menu';
import { TorneosMenuPage } from './../torneos-menu/torneos-menu';
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


  getTorneos(){
    this.navCtrl.push(TorneosMenuPage);
  }

  getSalidasI(){
    this.navCtrl.push(SalidasIMenuPage);
  }

  getSalidasE(){
    this.navCtrl.push(SalidasEMenuPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

}
