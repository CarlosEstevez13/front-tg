import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the CrearTorneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crear-torneo',
  templateUrl: 'crear-torneo.html',
})
export class CrearTorneoPage {

  form: FormGroup;
  
  idUsuario = sessionStorage.getItem('idUsuario');
  idRol = sessionStorage.getItem('idRol');
  idDeporte = sessionStorage.getItem('idDeporte');

  deportes:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private torneoService: TorneosProvider,
              public alertCtrl: AlertController) {
                this.form = this.fb.group({
                  idUsuario: new FormControl(this.idUsuario),
                  idRol: new FormControl(this.idRol),
                  idDeporte: new FormControl(),
                  descripcion: new FormControl(),
                  reglamento: new FormControl(),
                  maxEquipos: new FormControl(),
                  nombre: new FormControl(),
                  fechaInicio: new FormControl(),
                  longitud: new FormControl(1),
                  latitud: new FormControl(1),
                  
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearTorneoPage');
    this.getDeportes();
  }

  getDeportes(){
    this.torneoService.getDeportes()
      .subscribe(
        res=>{
          this.deportes = res.result;
          console.log(this.deportes);
        },
        e=>{

        }
      )
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Felicidades!',
      subTitle: 'Has creado un torneo con exito!',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
      
    });
    alert.present();
  }

  crear(){
    this.torneoService.addTorneo(this.form.value)
      .subscribe(
        res=>{
          console.log(res);
          this.showAlert();
        },
        e=>{
          console.log(e);
        }
      );
      
  }

}
