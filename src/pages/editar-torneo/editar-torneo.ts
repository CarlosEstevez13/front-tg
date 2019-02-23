import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the EditarTorneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-torneo',
  templateUrl: 'editar-torneo.html',
})
export class EditarTorneoPage {

  torneo:{
    idUsuario,
    idRol,
    idDeporte,
    descripcion,
    reglamento,
    maxEquipos,
    nombre,
    fechaInicio,
    deporte,
    latitud,
    longitud
  } = {
    idUsuario:0,
    idRol:0,
    idDeporte:0,
    descripcion:'',
    reglamento:'',
    maxEquipos:0,
    nombre:"",
    fechaInicio:'',
    deporte:'',
    latitud:0,
    longitud:0,
  };
  form: FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private torneoService: TorneosProvider) {
                
                this.form = this.fb.group({
                  idUsuario: new FormControl(this.torneo.idUsuario),
                  idRol: new FormControl(this.torneo.idRol),
                  idDeporte: new FormControl({ value:this.torneo.idDeporte, disabled:true}),
                  descripcion: new FormControl(this.torneo.descripcion),
                  reglamento: new FormControl(this.torneo.reglamento),
                  maxEquipos: new FormControl(this.torneo.maxEquipos),
                  nombre: new FormControl(this.torneo.nombre),
                  fechaInicio: new FormControl(this.torneo.fechaInicio),
                  longitud: new FormControl(this.torneo.longitud),
                  latitud: new FormControl(this.torneo.latitud),
                  deporte: new FormControl({ value:this.torneo.deporte, disabled:true}),
                  
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarTorneoPage');
    this.torneoService.getTorneo()
      .subscribe(
        res=>{
          this.torneo = res.result[0];
          this.form.setValue({
            idUsuario: this.torneo.idUsuario,
                  idRol: this.torneo.idRol,
                  idDeporte: this.torneo.idDeporte,
                  descripcion: this.torneo.descripcion,
                  reglamento: this.torneo.reglamento,
                  maxEquipos: this.torneo.maxEquipos,
                  nombre: this.torneo.nombre,
                  fechaInicio: this.torneo.fechaInicio,
                  latitud: this.torneo.latitud,
                  longitud: this.torneo.longitud,
                  deporte: this.torneo.deporte,
          })
        },
        e=>{
          console.log(e);
        }
      )
  }

  editar(){
    this.torneoService.putTorneo(this.form.value)
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
