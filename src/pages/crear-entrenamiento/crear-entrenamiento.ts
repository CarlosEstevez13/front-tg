import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CrearEntrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-entrenamiento',
  templateUrl: 'crear-entrenamiento.html',
})
export class CrearEntrenamientoPage {

  form: FormGroup;
  id:any;
  idUsuario:any;
  idDeporte:any;
  idRol:any;
  deportes:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _salidaIProvider : SalidaIProvider,
              public alertCtrl: AlertController,
              private fb: FormBuilder) {

                this.idUsuario = sessionStorage.getItem('idUsuario');
                this.idRol = sessionStorage.getItem('idRol');
                this.idDeporte = sessionStorage.getItem('idDeporte');

                this.form = this.fb.group({
                  descripcion: new FormControl(),
                  finalizado: new FormControl(0),
                  idUsuario: new FormControl(this.idUsuario),
                  idDeporte: new FormControl(this.idDeporte),
                  idRol: new FormControl(this.idRol),
                  fecha: new FormControl(),
                  hora: new FormControl(),
                  nroParticipantes: new FormControl(),
                  entrenamiento: new FormControl(1),
                  horaFin: new FormControl(),
                  latitud: new FormControl(1),
                  longitud: new FormControl(1),
                  nombre: new FormControl(),
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEntrenamientoPage');
  }

  crear(){
    console.log(this.form.value);
    this._salidaIProvider.addSalida(this.form.value)
      .subscribe(
        res=>{
          console.log(res.result);
          let data = {
            idSalidaI: res.result.idSalidaI,
            idUsuario: this.idUsuario,
            idDeporte: this.idDeporte,
            idRol: this.idRol
          };
          this._salidaIProvider.addSalidaIUsuario(data)
          .subscribe(
            res=>{
              console.log(res);
              this.showAlert();
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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Felicidades!',
      subTitle: 'Has creado una salida con exito!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
      
    });
    alert.present();
  }


}
