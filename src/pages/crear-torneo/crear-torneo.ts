import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UbicacionPage } from './../ubicacion/ubicacion';
import { HttpClient } from '@angular/common/http';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-crear-torneo',
  templateUrl: 'crear-torneo.html',
})
export class CrearTorneoPage {

  form: FormGroup;

  deporte:any;
  
  idUsuario = sessionStorage.getItem('idUsuario');
  idRol = sessionStorage.getItem('idRol');
  idDeporte = sessionStorage.getItem('idDeporte');

  deportes:any;
  selectedFile: File = null;
  arbitros:any =[];
  hoy:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private http: HttpClient,
              private fb: FormBuilder,
              private torneoService: TorneosProvider,
              private usuarioProvider: UsuarioProvider,
              public alertCtrl: AlertController) {
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
                  jurado: new FormControl(),
                  genero: new FormControl(),
                  individual: new FormControl()
                  
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrearTorneoPage');
    sessionStorage.setItem('tempLat','1');
    sessionStorage.setItem('tempLng','1');
    this.getDeportes();
    this.getArbitros();
  }

  getArbitros(){
    this.torneoService.getJuez()
      .subscribe(
        res=>{
          this.arbitros = res.result;
        },
        e=>{
          console.log(e);
        }
      );
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
    this.http.post('http://192.168.1.10:3002/api/uploadPdf', fd)
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
                  longitud: sessionStorage.getItem('tempLng'),
                  latitud: sessionStorage.getItem('tempLat'),
                  jurado: this.form.value.jurado,
                  genero: this.form.value.genero,
                  individual: this.form.value.individual
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
  agregarUbicacion(){
    this.navCtrl.push(UbicacionPage);
  }

  ionViewWillLeave(){
    sessionStorage.removeItem('tempLat');
    sessionStorage.removeItem('tempLng');
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
    this.form.value.latitud = sessionStorage.getItem('tempLat');
    this.form.value.longitud = sessionStorage.getItem('tempLng');
    let correcto = 0;
    this.torneoService.addTorneo(this.form.value)
      .subscribe(
        res=>{
          console.log(res);
          for (let i in this.form.value.jurado){

            let data = {
              tipo: 8,
              descripcion: `Te han invitado a arbitrar el torneo: ${this.form.value.nombre}`,
              idEquipo: 0,
              idSalida: (res.result.idTorneo - 1),
              idUsuario: this.form.value.jurado[i]
            }
            this.usuarioProvider.addNotificacion(data)
              .subscribe(
                res=>{
                  console.log(res);
                  correcto=1;
                },
                e=>{
                  console.log(e);
                  correcto=1;
                }
              )

            /* let data = {
              idTorneo : (res.result.idTorneo - 1),
              idUsuario : this.form.value.jurado[i],
              idRol : 3
            }
            
            this.torneoService.addJuez(data)
              .subscribe(
                res=>{
                  console.log(res);
                  correcto = 1;
                },
                e=>{
                  correcto = 1;
                  console.log(e);
                }
              ) */
          }
        },
        e=>{
          console.log(e);
        }
        );
        
        setTimeout(() => {
          if(correcto ==1){
            
            this.showAlert();
        }
        
      }, 1000);
      
  }

}
