import { UbicacionPage } from './../ubicacion/ubicacion';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-crear-salida-e',
  templateUrl: 'crear-salida-e.html',
})
export class CrearSalidaEPage {

  form: FormGroup;
  idEquipo = sessionStorage.getItem('idEquipo');
  deportes:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              public alertCtrl: AlertController,
              private salidaService:SalidaEProvider) {

                this.form = this.fb.group({
                  idEquipo: new FormControl(this.idEquipo),
                  nombre: new FormControl(),
                  descripcion: new FormControl(),
                  fecha: new FormControl(),
                  hora: new FormControl(),
                  horaFin: new FormControl(),
                  latitud: new FormControl(null),
                  longitud: new FormControl(null),
                  idDeporte: new FormControl()
                });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CrearSalidaEPage');
    this.salidaService.getDeportes()
      .subscribe(
        res=>{
          this.deportes = res.result;
        },
        e=>{
          console.log(e);
          this.deportes = [];
        }
      )
  }
  
  ionViewDidLoad(){
    sessionStorage.setItem('tempLat','null');
    sessionStorage.setItem('tempLng','null');
  }

  agregarUbicacion(){
    this.navCtrl.push(UbicacionPage);
  }

  crear(){
    console.log(this.form.value);
    this.form.value.latitud = sessionStorage.getItem('tempLat');
    this.form.value.longitud = sessionStorage.getItem('tempLng');
    console.log(this.form.value);

    this.salidaService.addSalida(this.form.value)
      .subscribe(
        res=>{
          console.log(res.result.idSalidaE);
          let data = {
            idSalidaE: (res.result.idSalidaE - 1),
            idEquipo: this.idEquipo
          };
          this.salidaService.addSalidaEquipo(data)
            .subscribe(
              res=>{
                console.log(res);
                sessionStorage.removeItem('tempLat');
                sessionStorage.removeItem('tempLng');
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

  ionViewWillLeave(){
    sessionStorage.removeItem('tempLat');
    sessionStorage.removeItem('tempLng');
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Felicidades!',
      subTitle: 'Has creado una salidaE con exito!',
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
