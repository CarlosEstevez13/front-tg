import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UbicacionPage } from './../ubicacion/ubicacion';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';


@IonicPage()
@Component({
  selector: 'page-crear-salida-e',
  templateUrl: 'crear-salida-e.html',
})
export class CrearSalidaEPage {

  form: FormGroup;
  idEquipo = sessionStorage.getItem('idEquipo');
  deportes:any = [];
  equipos:any = [];
  hoy:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              public alertCtrl: AlertController,
              private usuarioProvider: UsuarioProvider,
              private equipoProvider: EquipoProvider,
              private salidaService:SalidaEProvider) {

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
                  idEquipo: new FormControl(this.idEquipo),
                  nombre: new FormControl('', Validators.required),
                  genero: new FormControl(0, Validators.required),
                  descripcion: new FormControl('', Validators.required),
                  fecha: new FormControl('', Validators.required),
                  hora: new FormControl('', Validators.required),
                  horaFin: new FormControl('', Validators.required),
                  latitud: new FormControl(null),
                  longitud: new FormControl(null),
                  idDeporte: new FormControl(),
                  rival: new FormControl(0),
                  direccion: new FormControl()
                });
  }

  ionViewWillEnter() {
    if(sessionStorage.getItem('agrego') == '1'){
      console.log('entro');
      this.form.setValue({
                  idEquipo: this.form.value.idEquipo,
                  nombre: this.form.value.nombre,
                  genero: this.form.value.genero,
                  descripcion: this.form.value.descripcion,
                  fecha: this.form.value.fecha,
                  hora: this.form.value.hora,
                  horaFin: this.form.value.horaFin,
                  latitud: sessionStorage.getItem('tempLat'),
                  longitud: sessionStorage.getItem('tempLng'),
                  idDeporte: this.form.value.idDeporte,
                  rival: this.form.value.rival,
                  direccion: sessionStorage.getItem('direccion')
      });
      console.log(this.form.value);
    }
    console.log('ionViewDidLoad CrearSalidaEPage');

    console.log(this.form.value);
    this.salidaService.getDeportes()
      .subscribe(
        res=>{
          this.deportes = res.result;
        },
        e=>{
          console.log(e);
          this.deportes = [];
        }
      )
    this.salidaService.getEquipos(sessionStorage.getItem('idEquipo'))
      .subscribe(
        res=>{
          this.equipos = res.result;
        },
        e=>{
          console.log(e);
        }
      );
  }
  
  ionViewDidLoad(){
    sessionStorage.setItem('tempLat','');
    sessionStorage.setItem('tempLng','');
    sessionStorage.setItem('direccion','null');
    sessionStorage.setItem('ver','0');
  }

  agregarUbicacion(){
    this.navCtrl.push(UbicacionPage);
  }

  crear(){
    console.log(this.form.value);
    this.form.value.latitud = sessionStorage.getItem('tempLat');
    this.form.value.longitud = sessionStorage.getItem('tempLng');
    this.form.value.direccion = sessionStorage.getItem('direccion');
    console.log(this.form.value);

    let id:any;
    this.salidaService.addSalida(this.form.value)
      .subscribe(
        res=>{
          console.log(res.result.idSalidaE);
          id = (res.result.idSalidaE - 1);
          let data = {
            idSalidaE: (res.result.idSalidaE - 1),
            idEquipo: this.idEquipo
          };
          this.salidaService.addSalidaEquipo(data)
            .subscribe(
              res=>{
                console.log(res);
                sessionStorage.removeItem('tempLat');
                sessionStorage.removeItem('tempLng');
                if(this.form.value.rival!=0){
                  let data1 = {
                    idSalidaE: id,
                    idEquipo: this.form.value.rival
                  };
                  this.salidaService.addSalidaEquipo(data1)
                    .subscribe(
                      res=>{
                        console.log(res);
                        this.equipoProvider.getIntegrantes(this.form.value.rival)
                          .subscribe(
                            res=>{
                              let integrantes = res.result;
                              console.log(integrantes);
                    
                              for(let i in integrantes){
                                let data = {
                                  tipo: 5,
                                  descripcion: `Te han invitado a jugar la salida por equipos: '${this.form.value.nombre}'`,
                                  idEquipo: 0,
                                  idSalida: 0,
                                  idUsuario: integrantes[i].idUsuario,
                                  idRemitente: sessionStorage.getItem('idUsuario')
                                }
                                this.usuarioProvider.addNotificacion(data)
                                  .subscribe(
                                    res=>{
                                      console.log(res);
                                    },
                                    e=>{
                                      console.log(e);
                                    }
                                  )
                              }
                            },
                            e=>{
                              console.log(e);
                            });
                      },
                      e=>{
                        console.log(e)
                      }
                    )
                  
                }
                this.showAlert();
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          console.log(e);
        }
      )
  }

  ionViewWillLeave(){
    sessionStorage.removeItem('tempLat');
    sessionStorage.removeItem('tempLng');
    sessionStorage.removeItem('direccion');
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