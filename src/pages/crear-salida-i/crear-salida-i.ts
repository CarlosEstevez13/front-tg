import { UbicacionPage } from './../ubicacion/ubicacion';

import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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
                idDeporte: new FormControl(),
                idRol: new FormControl(this.idRol),
                fecha: new FormControl('', Validators.required),
                hora: new FormControl('', Validators.required),
                nroParticipantes: new FormControl(10, Validators.required),
                entrenamiento: new FormControl(0),
                horaFin: new FormControl('', Validators.required),
                latitud: new FormControl(null),
                longitud: new FormControl(null),
                nombre: new FormControl('', Validators.required),
                genero: new FormControl(),
                direccion: new FormControl()
              });
  }

  ionViewDidLoad() {
    sessionStorage.setItem('tempLat','');
    sessionStorage.setItem('tempLng','');
    sessionStorage.setItem('direccion','null');
    sessionStorage.setItem('ver','0');
    console.log('ionViewDidLoad CrearSalidaIPage');
    this._salidaIProvider.getDeporte().subscribe(
      res=>{
        this.deportes=res.result;
        console.log(res.result);
    },e=>{
      
      console.log(e);

    });
    
  }

  ionViewWillEnter() {
    
    console.log(this.form.value);
    console.log('ionViewDidLoad CrearSalidaEPage');
    

    if(sessionStorage.getItem('agrego') == '1'){
      console.log('entro');
      this.form.setValue({
        descripcion: this.form.value.descripcion,
        finalizado: this.form.value.finalizado,
        idUsuario: this.form.value.idUsuario,
        idDeporte: this.form.value.idDeporte,
        idRol: this.form.value.idRol,
        fecha: this.form.value.fecha,
        hora: this.form.value.hora,
        nroParticipantes: this.form.value.nroParticipantes,
        entrenamiento: this.form.value.entrenamiento,
        horaFin: this.form.value.horaFin,
        latitud: sessionStorage.getItem('tempLat'),
        longitud: sessionStorage.getItem('tempLng'),
        nombre: this.form.value.nombre,
        genero: this.form.value.genero,
        direccion: sessionStorage.getItem('direccion')
      });
      console.log(this.form.value);
    }
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
    this.form.value.direccion = sessionStorage.getItem('direccion');
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
