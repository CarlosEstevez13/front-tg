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

  tiene:boolean = false;
  idEquipo = 1;
  idDeporte = 1;
  nroInt:any = [];
  equipos:any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public _equipoService: EquipoProvider,
      public alertCtrl: AlertController) {
        
      if(this.tiene ==false){
        this.getNroInt();
        this.getEquipos();
        
      } 
      /* this.getEquipos(); */
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

  showPrompt() {
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
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }


}
