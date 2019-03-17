import { UsuarioProvider } from './../../providers/usuario/usuario';
import { UbicacionPage } from './../ubicacion/ubicacion';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
                  nombre: new FormControl(),
                  genero: new FormControl(),
                  descripcion: new FormControl(),
                  fecha: new FormControl(),
                  hora: new FormControl(),
                  horaFin: new FormControl(),
                  latitud: new FormControl(null),
                  longitud: new FormControl(null),
                  idDeporte: new FormControl(),
                  rival: new FormControl(0)
                });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad CrearSalidaEPage');
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
    sessionStorage.setItem('tempLat','null');
    sessionStorage.setItem('tempLng','null');
  }

  agregarUbicacion(){
    this.navCtrl.push(UbicacionPage);
  }

  crear(){
    console.log(this.form.value);
    this.form.value.latitud = sessionStorage.getItem('tempLat');
    this.form.value.longitud = sessionStorage.getItem('tempLng');
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
                                  descripcion: `Te ha invitado a jugar la salida por equipos ${this.form.value.nombre}`,
                                  idEquipo: 0,
                                  idSalida: 0,
                                  idUsuario: integrantes[i].idUsuario
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
