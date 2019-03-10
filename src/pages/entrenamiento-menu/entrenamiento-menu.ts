import { MisEntrenamientosPage } from './../mis-entrenamientos/mis-entrenamientos';
import { CrearEntrenamientoPage } from './../crear-entrenamiento/crear-entrenamiento';
import { VerEntrenamientoPage } from './../ver-entrenamiento/ver-entrenamiento';
import { BuscarEntrenamientoPage } from './../buscar-entrenamiento/buscar-entrenamiento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EntrenamientoMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entrenamiento-menu',
  templateUrl: 'entrenamiento-menu.html',
})
export class EntrenamientoMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /* buscarEntrenamiento(){
    this.navCtrl.push(BuscarEntrenamientoPage);
  }
 */
  inscritos(){
    this.navCtrl.push(VerEntrenamientoPage);
  }

  crearEntrenamiento(){
    this.navCtrl.push(CrearEntrenamientoPage);
  }

  misEntrenamiento(){
    this.navCtrl.push(MisEntrenamientosPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntrenamientoMenuPage');
  }

}
