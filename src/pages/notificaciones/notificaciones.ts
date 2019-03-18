import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { VerEquipoPage } from './../ver-equipo/ver-equipo';
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

  torneo:any;

  constructor(public navCtrl: NavController, 
              private usuarioProvider: UsuarioProvider,
              private torneoProvider: TorneosProvider,
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
  verEquipo(idEquipo:any){
    sessionStorage.setItem('idEquipo',idEquipo);
    sessionStorage.setItem('temp','1');
    this.navCtrl.push(VerEquipoPage);
  }

  verTorneo(idTorneo,idNotificacion){
      sessionStorage.setItem('temp',`${idNotificacion}`);
      this.torneoProvider.setIdTorneo(idTorneo);
      this.torneoProvider.setIdVer(2);
      this.navCtrl.push(VerTorneoPage);
  }

  borrar(idNotificacion, i, tipo, idSalida){
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
    if(tipo ==8){
      this.torneoProvider.setIdTorneo(idSalida);
      this.torneoProvider.getTorneo()
        .subscribe(
          res=>{
            console.log(res);
            this.torneo = res.result[0];

            let data = {
              tipo: 9,
              descripcion: `El juez ${sessionStorage.getItem('nombreArbitro')} ha rechazado arbitrar el torneo: ${this.torneo.nombre}`,
              idEquipo: 0,
              idSalida: 0,
              idUsuario: this.torneo.idUsuario
            }
            this.usuarioProvider.addNotificacion(data)
              .subscribe(
                res=>{
                  console.log(res);
                  this.navCtrl.pop();
                },
                e=>{
                  console.log(e);
                }
              );
            
          },
          e=>{
            console.log(e);
          }
        );

    }
  }

}
