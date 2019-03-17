import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notificaciones',
  templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {

  notificaciones:any = [];

  constructor(public navCtrl: NavController, 
              private usuarioProvider: UsuarioProvider,
              public navParams: NavParams) {
  }

  ionViewWillEnter(){
    let idUsuario = sessionStorage.getItem('idUsuario');
    this.notificaciones =[];
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
  borrar(idNotificacion, i){
    this.usuarioProvider.putNotificacion(idNotificacion)
      .subscribe(
        res=>{
          console.log(res);
          this.notificaciones.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      );
  }

}
