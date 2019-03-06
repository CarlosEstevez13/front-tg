import { UbicacionPage } from './../ubicacion/ubicacion';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-editar-salida-e',
  templateUrl: 'editar-salida-e.html',
})
export class EditarSalidaEPage {

  form: FormGroup;

  salida = {
    idEquipo:0,
    nombre:'',
    descripcion: '',
    fecha:'',
    hora:'',
    horaFin:'',
    latitud:'',
    longitud:''
  }

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private salidaProvider: SalidaEProvider,
              private fb: FormBuilder) {

                this.form = this.fb.group({
                  idEquipo: new FormControl(),
                  nombre: new FormControl(),
                  descripcion: new FormControl(),
                  fecha: new FormControl(),
                  hora: new FormControl(),
                  horaFin: new FormControl(),
                  latitud: new FormControl(),
                  longitud: new FormControl()
                });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad EditarSalidaEPage');
    this.salidaProvider.getSalida()
      .subscribe(
        res=>{
          this.salida = res.result[0];
          console.log(this.salida);
          this.form.setValue({
            idEquipo: this.salida.idEquipo,
            nombre: this.salida.nombre,
            descripcion: this.salida.descripcion,
            fecha: this.salida.fecha,
            hora: this.salida.hora,
            horaFin: this.salida.horaFin,
            latitud: this.salida.latitud,
            longitud: this.salida.longitud
          });
          if(sessionStorage.getItem('tempLat')){
            this.form.value.latitud = sessionStorage.getItem('tempLat');
            this.form.value.longitud = sessionStorage.getItem('tempLng');
          }

        },
        e=>{
          console.log(e);
        }
      );
  }

  editarUbicacion(){
    sessionStorage.setItem('tempLat','null');
    sessionStorage.setItem('tempLng','null');
    this.navCtrl.push(UbicacionPage);
  }
  ionViewWillLeave(){
    sessionStorage.removeItem('tempLat');
    sessionStorage.removeItem('tempLng');
  }

  editar(){
    this.salidaProvider.putSalida(this.form.value)
      .subscribe(
        res=>{
          console.log(res);
          sessionStorage.removeItem('tempLat');
          sessionStorage.removeItem('tempLng');
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      );
  }

}
