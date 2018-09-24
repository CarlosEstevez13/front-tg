import { EquipoProvider } from './../../providers/equipo/equipo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-equipo',
  templateUrl: 'equipo.html',
})
export class EquipoPage {

  tiene:any = 1;
  capitan:any = 0;

  enviarInput:any = '';
  idUsuario = 5;
  idRol = 1;
  idEquipo = 1;
  idDeporte = 1;
  nroInt:any = [];
  equipos:any;
  solicitud:{
    'idEquipo':any,
    'idUsuario':any,
    'descripcion':any,
    'estado':any
  } = {
    'idEquipo':'',
    'idUsuario':'',
    'descripcion':'',
    'estado': 2
  };

  mensaje:{
    'idUsuario':any,
    'idRol':any,
    'idDeporte':any,
    'frase':any,
    'fecha':any,
    'idEquipo':any
  }

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public _equipoService: EquipoProvider,
      public alertCtrl: AlertController) {
        
      if(this.tiene ==false){
        this.getNroInt();
        this.getEquipos();
        this.getSolUsuario();
      } 
      /* this.getEquipos(); */
  }

  iniciarMensaje(){
    this.mensaje.idUsuario = this.idUsuario;
    this.mensaje.idRol = this.idRol;
    this.mensaje.idDeporte = this.idDeporte;
    this.mensaje.frase = '';
    this.mensaje.fecha = '0000-00-00';
    this.mensaje.idEquipo = this.idEquipo;
  }

  getEquipos(){
    console.log('ingreso');
    this._equipoService.getEquipos(this.idDeporte)
        .subscribe(res=> {
          this.equipos = res.result;

          for (let i in this.equipos){
            for (let j in this.nroInt){
               if (this.equipos[i].idEquipo == this.nroInt[j].idEquipo){
                 this.equipos[i].nroInt = this.nroInt[j].nroIntegrantes;
                 break;
               }else{
                 this.equipos[i].nroInt = 0;
               }
            }
          } 

          console.log(this.equipos);
        },
        e=>{
          console.log('ocurrio un error');
        });
  }

  getNroInt(){
    this._equipoService.getNroIntEquipos(this.idDeporte)
        .subscribe(res=> {
          this.nroInt = res.result;
          console.log(this.nroInt);
        },
        e=>{
          console.log('ocurrio un error');
        });
     
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.getEquipos();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    setTimeout(
      ()=>{
        if (val && val.trim() != '') {
          this.equipos = this.equipos.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      },150
    );
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipoPage');
  }

  showPrompt(idEquipo) {
    const prompt = this.alertCtrl.create({
      title: 'Solicitud de ingreso',
      message: "Escriba una descripcion de su solicitud",
      inputs: [
        {
          name: 'title',
          placeholder: 'Escriba aqui'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            this.enviarSolicitud(idEquipo,data.title)
          }
        }
      ]
    });
    prompt.present();
  }

  enviarSolicitud(idEquipo, descripcion){
    this.solicitud.idUsuario = this.idUsuario;
    this.solicitud.idEquipo = idEquipo;
    this.solicitud.descripcion = descripcion;

    console.log(this.solicitud);

    this._equipoService.addSolicitud(this.solicitud).subscribe(
      res => {
        console.log(res);
      }, e => {
        console.log(e);
      }
    );
  }

  getSolUsuario(){
    this._equipoService.getSolicitudesUsuario(this.idUsuario)
      .subscribe(
        res => {
          for (let i in this.equipos){
            for (let j in res.result){
               if (this.equipos[i].idEquipo == res.result[j].idEquipo){
                 this.equipos[i].estado = 2;
                 break;
               }else{
                 this.equipos[i].estado = 3;
               }
            }
          } 
        }, e => {
          console.log(e);
        }
      );
  }

  enviar(){
    this.enviarInput = '';
    console.log('enviar!');
  }

}
