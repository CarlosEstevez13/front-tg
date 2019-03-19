import { UsuarioProvider } from './../../providers/usuario/usuario';
import { EntretenimientoPage } from './../entretenimiento/entretenimiento';
import { HistorialPage } from './../historial/historial';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';
import { NotificacionesPage } from '../notificaciones/notificaciones';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notificaciones:any = [];
  idRol:any;

  constructor(public navCtrl: NavController,
              private usuarioProvider: UsuarioProvider,
              private equipoService: EquipoProvider) {
   /*  sessionStorage.setItem('idUsuario','5');
    sessionStorage.setItem('idRol','1');
    sessionStorage.setItem('idEquipo','1');
    sessionStorage.setItem('idDeporte','1'); */
    this.idRol = sessionStorage.getItem('idRol');

    this.usuarioProvider.getUsuario(sessionStorage.getItem('idUsuario'))
      .subscribe(
        res=>{
          console.log(res);
          if(this.idRol = 3){
            sessionStorage.setItem('nombreArbitro',`${res.result[0].nombre}`)
          }
        },
        e=>{
          console.log(e);
        }
      )
    
  }
  ionViewWillEnter(){
    this.notificaciones = [];
    let idUsuario = sessionStorage.getItem('idUsuario');
    console.log(idUsuario);
    this.equipoService.setIdEquipo(sessionStorage.getItem('idEquipo'));
    this.equipoService.setIdUsuario(idUsuario);
    this.usuarioProvider.getNotificacionesU(idUsuario)
      .subscribe(
        res=>{
          this.notificaciones = res.result;
          console.log(this.notificaciones);
        },
        e=>{
          console.log(e);
        }
      );
  }

  perfil(){
    this.navCtrl.push(PerfilPage);
  }
  
  notificacion(){
    this.navCtrl.push(NotificacionesPage);
  }

  historial(){
    this.navCtrl.push(HistorialPage);
  }

  entretenimiento(){
    this.navCtrl.push(EntretenimientoPage);
  }
}
