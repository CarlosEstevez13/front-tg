import { HttpClient } from '@angular/common/http';
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
  selectedFile: File = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: HttpClient,
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

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.agregarPdf();
  }

  agregarPdf(){
    let aleatorio =Math.trunc(Math.random() * (10000));
    console.log(aleatorio);
    const fd  = new FormData();
    fd.append('pdf', this.selectedFile, `${aleatorio}-${this.idUsuario}`);
    this.http.post('http://10.14.21.84:3002/api/uploadPdf', fd)
      .subscribe(
        res=>{
          console.log(res)
          this.form.setValue({
                 idUsuario: this.form.value.idUsuario,
                  idRol: this.form.value.idRol ,
                  idDeporte: this.form.value.idDeporte ,
                  descripcion: this.form.value.descripcion ,
                  reglamento: `${aleatorio}-${this.idUsuario}`,
                  maxEquipos: this.form.value.maxEquipos ,
                  nombre: this.form.value.nombre,
                  fechaInicio: this.form.value.fechaInicio ,
                  longitud: this.form.value.longitud,
                  latitud: this.form.value.latitud
          })
          
        },
        e=>{
          console.log(e)
        }
      )
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
