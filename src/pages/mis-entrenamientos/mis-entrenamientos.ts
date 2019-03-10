import { EditarSalidasIPage } from './../editar-salidas-i/editar-salidas-i';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the MisEntrenamientosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-entrenamientos',
  templateUrl: 'mis-entrenamientos.html',
})
export class MisEntrenamientosPage {

  id:any;
  salida:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public _salidaIProvider : SalidaIProvider) {

              this.id = sessionStorage.getItem('idUsuario')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MisEntrenamientosPage');
    this._salidaIProvider.getMisEntrenamientos(this.id).subscribe(
      res=>{
          
          this.salida=res.result;
          console.log(this.salida);
      },
      e=>{
          console.log(e);
      }
    );
  }

  editar(idSalida:any, entrenamiento:any){
    sessionStorage.setItem('idSalidaI',idSalida);
    sessionStorage.setItem('entrenamiento',entrenamiento)
    this.navCtrl.push(EditarSalidasIPage);
  }

  eliminar(idSalida:any){
    console.log('entro');

    this._salidaIProvider.deleteSalidaIUsuario(idSalida)
      .subscribe(
        res=>{
          console.log(res);
          this._salidaIProvider.deleteSalidaI(idSalida)
            .subscribe(
              res=>{
                console.log(res);
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          console.log(e);
        }
      )

    
  }

  showAlert(idSalida:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este entrenamiento?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idSalida)
          this.navCtrl.pop();
        }
      },
        {
          text: 'No',
          handler: () => {
            //this.navCtrl.pop();
          } 
          }
    ]
      
    });
    alert.present();
  }
}
