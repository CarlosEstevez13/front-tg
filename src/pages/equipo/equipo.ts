import { EditarEquipoPage } from './../editar-equipo/editar-equipo';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { AgregarIntegrantePage } from '../agregar-integrante/agregar-integrante';

@IonicPage()
@Component({
  selector: 'page-equipo',
  templateUrl: 'equipo.html',
})
export class EquipoPage {

  tiene:any = sessionStorage.getItem('idEquipo');
  capitan:any = 1;

  enviarInput:any = '';

  infoEquipo:any = [];
  nombre = 'Lionel Messi'
  
  nroInt:any = [];
  equipos:any;
  mensajes:any;
  solicitudesEquipo: any = [];
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
    'idEquipo':any,
    'remitente':any
  } = {
    'idUsuario':'',
    'idRol':'',
    'idDeporte':'',
    'frase':'',
    'fecha':'',
    'idEquipo':'',
    'remitente':''
  }

  idUsuario;
  idRol;
  idEquipo;
  idDeporte;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public _equipoService: EquipoProvider,
      public alertCtrl: AlertController) {
        
        this.idUsuario = sessionStorage.getItem('idUsuario');
        this.idRol = sessionStorage.getItem('idRol');
        this.idEquipo = sessionStorage.getItem('idEquipo');
        this.idDeporte = sessionStorage.getItem('idDeporte');

     
  }

  iniciarMensaje(){
    this.mensaje.idUsuario = this.idUsuario;
    this.mensaje.idRol = this.idRol;
    this.mensaje.idDeporte = this.idDeporte;
    this.mensaje.frase = this.enviarInput;
    this.mensaje.fecha = '2018-09-01';
    this.mensaje.idEquipo = this.idEquipo;
    this.mensaje.remitente = this.nombre;
  }

  getSolicitudes(){
    this._equipoService.getSolicitudesEquipo(this.idEquipo)
        .subscribe(
          res=>{
            this.solicitudesEquipo = res.result;
            console.log(this.solicitudesEquipo);
          },
          e=>{
            console.log(e);
            this.solicitudesEquipo = [];
          }
        )
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

  ionViewDidEnter(){
    if(this.tiene ==0){
      this.getNroInt();
      this.getEquipos();
      this.getSolUsuario();
    } else{
      this.getInfoEquipo();
      this.getMensajes();
      this.getSolicitudes();
      this.getAll();
    }

    
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
            
            this.enviarSolicitud(idEquipo,data.title);
            
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
        this.getSolUsuario();
      }, e => {
        console.log(e);
      }
    );
  }

  getSolUsuario(){
    this._equipoService.getSolicitudesUsuario(this.idUsuario)
      .subscribe(
        res => {
          console.log(res);
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

  getMensajes(){
    this._equipoService.getMensajesEquipo(this.idEquipo)
    .subscribe(
      res => {
        this.mensajes = res.result;
      }, e => {
        console.log(e);
      }
    );
  }

  enviar(){
    this.iniciarMensaje();
    this._equipoService.addMensaje(this.mensaje)
      .subscribe(
        res => {
          console.log(res);
        }, e => {
          console.log(e);
        }
      );

    this.enviarInput = '';
    
  }

  getAll() {
    var me =this;
    setTimeout(function(){
    me.getMensajes();
    me.getAll();
    },5000);
  }

  getInfoEquipo(){
    this._equipoService.getInfoEquipo(this.idEquipo)
    .subscribe(
      res => {
        this.infoEquipo = res.result[0];
        console.log(this.infoEquipo);
      }, e => {
        console.log(e);
      }
    );
  }

  editarEquipo(){
    this._equipoService.cacheEquipo(this.infoEquipo);
    this.navCtrl.push(EditarEquipoPage);
  }

  agregarIntegrante(){
    this._equipoService.cacheSolicitudesEquipo(this.solicitudesEquipo);
    this.navCtrl.push(AgregarIntegrantePage);
  }

  salirDelEquipo(){
    console.log('salir del equipo');
  }
}
