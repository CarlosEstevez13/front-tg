import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';


@IonicPage()
@Component({
  selector: 'page-crear-equipo',
  templateUrl: 'crear-equipo.html',
})
export class CrearEquipoPage {

  form: FormGroup;
  idUsuario:any;

  constructor(public navCtrl: NavController, 
              private fb: FormBuilder,
              private equipoService: EquipoProvider,
              public navParams: NavParams) {
        this.form = this.fb.group({
          idEquipo: new FormControl(),
          nombre: new FormControl(),
          descripcion: new FormControl(),
          nroIntegrantes: new FormControl()
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearEquipoPage');
    this.idUsuario = sessionStorage.getItem('idUsuario');
  }

  agregarEquipo(){
    this.equipoService.addEquipo(this.form.value)
      .subscribe(
        res=>{
          console.log(res.result.idEquipo);
          
          let integrante = {
            idUsuario:this.idUsuario,
            idRol: 1, //deportista,
            idEquipo: (res.result.idEquipo - 1)
          };
          this.equipoService.addIntegrante(integrante,this.idUsuario)
            .subscribe(
              res=>{
                console.log(res);
                sessionStorage.setItem('idEquipo',`${integrante.idEquipo}`)
              },
              e=>{
                console.log(e);
              }
            )
        },
        e=>{
          console.log(e);
        }
      )
  }

}
