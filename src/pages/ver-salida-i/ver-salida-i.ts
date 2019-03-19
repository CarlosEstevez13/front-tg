import { IntegrantesSalidaIPage } from './../integrantes-salida-i/integrantes-salida-i';
import { UbicacionPage } from './../ubicacion/ubicacion';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the VerSalidaIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-salida-i',
  templateUrl: 'ver-salida-i.html',
})
export class VerSalidaIPage {

  id:any;
  idUsuario:any
  salida:any={};
  unir:any;
  idVer:any;

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public _salidaIProvider : SalidaIProvider,
              public alertCtrl: AlertController) {
            this.unir = sessionStorage.getItem('unir');
            this.id = sessionStorage.getItem('idSalidaI');
            this.idUsuario = sessionStorage.getItem('idUsuario');
          }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VerSalidaIPage');
    this._salidaIProvider.getSalidaI(this.id).subscribe(
      res=>{
          
          this.salida=res.result[0];
          console.log(this.salida);
      },
      e=>{
          console.log(e);
      }
    );
  }

  ionViewWillEnter(){
    /* this.idVer = this.salidaService.getIdVer(); */
    
    console.log(this.unir);
  }

  ubicacion(lat,lng){
    sessionStorage.setItem('tempLat',`${lat}`);
    sessionStorage.setItem('tempLng',`${lng}`);
    this.navCtrl.push(UbicacionPage);
  }

  volver(){
    this.navCtrl.pop()
  }

  unirse(){
    let data = {
      idSalidaI: sessionStorage.getItem('idSalidaI'),
      idUsuario: sessionStorage.getItem('idUsuario'),
      idRol:  sessionStorage.getItem('idRol'),
      idDeporte: sessionStorage.getItem('idDeporte'),
    }
    this._salidaIProvider.addSalidaIUsuario(data)
      .subscribe(
        res=>{
          console.log(res);
          this.showAlert2();
        },
        e=>{
          console.log(e);
        }
      );
  }

  eliminar(){
    console.log('entro');

    this._salidaIProvider.deleteSalidaIU(this.id, this.idUsuario)
      .subscribe(
        res=>{
          console.log(res);
        },
        e=>{
          console.log(e);
        }
      )
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: '¡Alerta!',
      subTitle: '¿Estas seguro de salir este Evento?',
      buttons: [{
        text: 'Si',
        handler: () => {
          console.log('entro');
          this.eliminar();
          this.navCtrl.pop();
          this.navCtrl.pop();
        }
      },
        {
          text: 'No',
          handler: () => {
          console.log('error');
            //this.navCtrl.pop();
          } 
          }
    ]
      
    });
    alert.present();
  }
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: '¡Felicidades!',
      subTitle: 'Te has unido con exito',
      buttons: [{
        text: 'ok',
        handler: () => {
          console.log('entro');
          this.navCtrl.pop();
          this.navCtrl.pop();
        }
      }
    ]
      
    });
    alert.present();
  }

  participantes(){
    this.navCtrl.push(IntegrantesSalidaIPage);
  }
}
