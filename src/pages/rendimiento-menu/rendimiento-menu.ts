import { HistorialRendimientoPage } from './../historial-rendimiento/historial-rendimiento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InstruccionesPage } from '../instrucciones/instrucciones';
import { RendimientoPage } from '../rendimiento/rendimiento';

/**
 * Generated class for the RendimientoMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rendimiento-menu',
  templateUrl: 'rendimiento-menu.html',
})
export class RendimientoMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendimientoMenuPage');
  }

  instrucciones(){
    this.navCtrl.push(InstruccionesPage);
  }
  agregar(){
    this.navCtrl.push(RendimientoPage);
  }
  historial(){
    this.navCtrl.push(HistorialRendimientoPage);
  }

}
