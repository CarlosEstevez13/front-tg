import { UbicacionPage } from './../ubicacion/ubicacion';

import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CrearSalidaIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-salida-i',
  templateUrl: 'crear-salida-i.html',
})
export class CrearSalidaIPage {

  form: FormGroup;
  id:any;
  idUsuario:any;
  idDeporte:0;
  idRol:any;
  genero:0;
  deportes:any = [];
  hoy:any;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             public _salidaIProvider : SalidaIProvider,
             public alertCtrl: AlertController,
             private fb: FormBuilder) {
             this.idUsuario = sessionStorage.getItem('idUsuario');
             this.idRol = sessionStorage.getItem('idRol');
             
             let h = new Date();
             let tomorrow = new Date();
             tomorrow.setDate(h.getDate()+1);
             let fecha = tomorrow;
             console.log(this.hoy);
            if(fecha.getMonth()+1 <10){
              if(fecha.getDate()<10){
               this.hoy = `${fecha.getFullYear()}-0${fecha.getMonth()+1}-0${fecha.getDate()}`
              }else{
               this.hoy = `${fecha.getFullYear()}-0${fecha.getMonth()+1}-${fecha.getDate()}`
              }
            }else{
             if(fecha.getDate()<10){
               this.hoy = `${fecha.getFullYear()}-${fecha.getMonth()+1}-0${fecha.getDate()}`
              }else{
               this.hoy = `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`
              }
            }
             console.log(this.hoy);
              this.form = this.fb.group({
                descripcion: new FormControl(),
                finalizado: new FormControl(0),
                idUsuario: new FormControl(this.idUsuario),
                idDeporte: new FormControl(this.idDeporte),
                idRol: new FormControl(this.idRol),
                fecha: new FormControl(),
                hora: new FormControl(),
                nroParticipantes: new FormControl(),
                entrenamiento: new FormControl(0),
                horaFin: new FormControl(),
                latitud: new FormControl(null),
                longitud: new FormControl(null),
                nombre: new FormControl(),
                genero: new FormControl(this.genero)
              });
  }

  ionViewDidLoad() {
    sessionStorage.setItem('tempLat','null');
    sessionStorage.setItem('tempLng','null');
    console.log('ionViewDidLoad CrearSalidaIPage');
    
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CrearSalidaEPage');
    this._salidaIProvider.getDeporte().subscribe(
      res=>{
        this.deportes=res.result;
        console.log(res.result);
    },e=>{
      
      console.log(e);

    });
  }


  agregarUbicacion(){
    this.navCtrl.push(UbicacionPage);
  }


  ionViewWillLeave(){
    sessionStorage.removeItem('tempLat');
    sessionStorage.removeItem('tempLng');
  }

  crear(){
    this.form.value.latitud = sessionStorage.getItem('tempLat');
    this.form.value.longitud = sessionStorage.getItem('tempLng');
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
          sessionStorage.removeItem('tempLat');
          sessionStorage.removeItem('tempLng');
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
