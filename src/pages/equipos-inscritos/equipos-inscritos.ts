import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the EquiposInscritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipos-inscritos',
  templateUrl: 'equipos-inscritos.html',
})
export class EquiposInscritosPage {

  torneo:{
    idTorneo:number,
    nombre:string
  } = {
    idTorneo: 0,
    nombre:''
  };

  equipos:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private torneoEquipo: TorneosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquiposInscritosPage');
    this.torneoEquipo.getTorneo()
      .subscribe(
        res=>{
          console.log(res.result);
          this.torneo = {
            idTorneo: res.result[0].idTorneo,
            nombre: res.result[0].nombre
          }
        },
        e=>{
          console.log(e);
        }
      );
    this.torneoEquipo.getEquiposEnTorneo()
      .subscribe(
        res=>{
          console.log(res);
          this.equipos = res.result;
        },
        e=>{
          console.log(e);
        }
      )
  }

}
