import { HistorialPage } from './../historial/historial';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {
  }

  perfil(){
    this.navCtrl.push(PerfilPage);
  }

  historial(){
    this.navCtrl.push(HistorialPage);
  }

}
