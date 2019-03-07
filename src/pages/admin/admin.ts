import { GestionarTorneosPage } from './../gestionar-torneos/gestionar-torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GestionarUsuarioPage } from '../gestionar-usuario/gestionar-usuario';
import { GestionarEquipoPage } from '../gestionar-equipo/gestionar-equipo';
import { GestionarSalidasIPage } from '../gestionar-salidas-i/gestionar-salidas-i';
import { GestionarSalidasEPage } from '../gestionar-salidas-e/gestionar-salidas-e';


@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  usuarios(){
    this.navCtrl.push(GestionarUsuarioPage);
  }
  equipos(){
    this.navCtrl.push(GestionarEquipoPage);
  }
  salidasI(){
    this.navCtrl.push(GestionarSalidasIPage);
  }
  salidasE(){
    this.navCtrl.push(GestionarSalidasEPage);
  }
  torneos(){
    this.navCtrl.push(GestionarTorneosPage);
  }

}
