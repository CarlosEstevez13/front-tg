import { UbicacionPage } from './../ubicacion/ubicacion';
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
    longitud,
    idGenero,
    nombreGenero,
    individual,
    tipo
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
    nombreGenero:0,
    individual:0,
    tipo:''
  };
  form: FormGroup;
  nombreTipo:any;


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
                  nombreGenero: new FormControl({ value:this.torneo.nombreGenero, disabled:true}),
                  individual: new FormControl({ value:this.torneo.individual, disabled:true}),
                  tipo: new FormControl({ value:this.torneo.tipo, disabled:true})
                });
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarTorneoPage');
    this.torneoService.getTorneo()
      .subscribe(
        res=>{
          this.torneo = res.result[0];
          console.log(this.torneo.individual);
          if(this.torneo.individual == 0){
            this.form.value.tipo = 'Por equipos';
            console.log('entro equipo');
          }
          if(this.torneo.individual == 1){
            this.form.value.tipo = 'Individual';
            console.log('entro individual');
          }
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
                  nombreGenero: this.torneo.nombreGenero,
                  tipo: this.form.value.tipo,
                  individual: this.torneo.individual
          });
          console.log(this.form.value.individual);
          if(sessionStorage.getItem('tempLat')){
            this.form.value.latitud = sessionStorage.getItem('tempLat');
            this.form.value.longitud = sessionStorage.getItem('tempLng');
          }
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
