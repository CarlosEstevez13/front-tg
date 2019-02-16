import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {
   /*  sessionStorage.setItem('idUsuario','5');
    sessionStorage.setItem('idRol','1');
    sessionStorage.setItem('idEquipo','1');
    sessionStorage.setItem('idDeporte','1'); */
  }

  perfil(){
    this.navCtrl.push(PerfilPage);
  }

}
