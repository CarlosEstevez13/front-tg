import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EquipoProvider } from '../../providers/equipo/equipo';


@IonicPage()
@Component({
  selector: 'page-editar-equipo',
  templateUrl: 'editar-equipo.html',
})
export class EditarEquipoPage {
  form: FormGroup;
  equipo: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private _equipoService: EquipoProvider) {

                this.equipo = this._equipoService.getCacheEquipo();

                this.form = this.fb.group({
                  idEquipo: new FormControl(this.equipo.idEquipo),
                  nombre: new FormControl(this.equipo.nombre),
                  descripcion: new FormControl(this.equipo.descripcion),
                  nroIntegrantes: new FormControl(this.equipo.nroIntegrantes),
                  idDeporte: new FormControl(this.equipo.idDeporte)
                });
            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarEquipoPage');
  }

  editarEquipo(){
    this._equipoService.putEquipo(this.form.value, this.equipo.idEquipo)
    .subscribe(
      res=>{
        console.log(res);
        this.navCtrl.pop();
      },
      e=>{
        console.log(e);
      }
    )
  }

}
