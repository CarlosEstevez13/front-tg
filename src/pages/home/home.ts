import { HistorialPage } from './../historial/historial';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
              private equipoService: EquipoProvider) {
   /*  sessionStorage.setItem('idUsuario','5');
    sessionStorage.setItem('idRol','1');
    sessionStorage.setItem('idEquipo','1');
    sessionStorage.setItem('idDeporte','1'); */
  }
  ionViewWillEnter(){
    let idUsuario = sessionStorage.getItem('idUsuario');
    console.log(idUsuario);
    this.equipoService.setIdEquipo(sessionStorage.getItem('idEquipo'));
    this.equipoService.setIdUsuario(idUsuario);
  }

  perfil(){
    this.navCtrl.push(PerfilPage);
  }

  historial(){
    this.navCtrl.push(HistorialPage);
  }

}
