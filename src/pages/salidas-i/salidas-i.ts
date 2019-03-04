import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';

/**
 * Generated class for the SalidasIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas-i',
  templateUrl: 'salidas-i.html',
})
export class SalidasIPage {

  id:any;
  disponibles: any =[];
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _salidaIProvider : SalidaIProvider) {

            this.id = sessionStorage.getItem('idUsuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalidasIPage');
    this._salidaIProvider.getSalidasDisponibles(this.id).subscribe(
      res=>{
          
          this.disponibles=res.result;
          console.log(this.disponibles);
      },
      e=>{
          console.log(e);
      }
    );
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '0');
    
    this.navCtrl.push(VerSalidaIPage);

  }

}
