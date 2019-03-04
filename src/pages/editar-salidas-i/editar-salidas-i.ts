
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditarSalidasIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-salidas-i',
  templateUrl: 'editar-salidas-i.html',
})
export class EditarSalidasIPage {

  form: FormGroup;
  id:any;

  salida ={
    descripcion:'',
    finalizado: 0,
    idUsuario: 0,
    idDeporte: 0,
    idRol: 0,
    fecha: '',
    hora: '',
    nroParticipantes: 0,
    entrenamiento: 0,
    horaFin: 'dfs',
    latitud: 0,
    longitud: 0,
    nombre: ''
  }

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public _salidaIProvider : SalidaIProvider,
               private fb: FormBuilder) {
                 
            this.id = sessionStorage.getItem('idSalidaI');

                this.form = this.fb.group({
                  descripcion: new FormControl(),
                  finalizado: new FormControl(),
                  idUsuario: new FormControl(),
                  idDeporte: new FormControl(),
                  idRol: new FormControl(),
                  fecha: new FormControl(),
                  hora: new FormControl(),
                  nroParticipantes: new FormControl(),
                  entrenamiento: new FormControl(),
                  horaFin: new FormControl(),
                  latitud: new FormControl(1),
                  longitud: new FormControl(1),
                  nombre: new FormControl(),
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarSalidasIPage');
    this._salidaIProvider.getSalidaI(this.id)
      .subscribe(
        res=>{
          this.salida = res.result[0];
          console.log(this.salida);
          this.form.setValue({
            descripcion: this.salida.descripcion,
            finalizado: this.salida.finalizado,
            idUsuario: this.salida.idUsuario,
            idDeporte: this.salida.idDeporte,
            idRol: this.salida.idRol,
            fecha: this.salida.fecha,
            hora: this.salida.hora,
            nroParticipantes: this.salida.nroParticipantes,
            entrenamiento: this.salida.entrenamiento,
            horaFin: this.salida.horaFin,
            latitud: this.salida.latitud,
            longitud: this.salida.longitud,
            nombre: this.salida.nombre,
          });
        },
        e=>{
          console.log(e);
        }
      );
  }

  editar(){
    this._salidaIProvider.putSalida(this.form.value, this.id)
      .subscribe(
        res=>{
          console.log(res);
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      );
  }

}
