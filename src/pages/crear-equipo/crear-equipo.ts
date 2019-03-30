import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
              public alertCtrl: AlertController,
              private equipoService: EquipoProvider,
              public navParams: NavParams) {
        this.form = this.fb.group({
          idEquipo: new FormControl(),
          nombre: new FormControl('', Validators.required),
          descripcion: new FormControl('', Validators.required),
          nroIntegrantes: new FormControl(20, Validators.required)
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
          this.showAlert();
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