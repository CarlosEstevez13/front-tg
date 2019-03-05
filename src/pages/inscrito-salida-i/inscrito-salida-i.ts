import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InscritoSalidaIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscrito-salida-i',
  templateUrl: 'inscrito-salida-i.html',
})
export class InscritoSalidaIPage {
  id:any;
  salida:any;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public _salidaIProvider : SalidaIProvider) {
            this.id = sessionStorage.getItem('idUsuario')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoaaad InscritoSalidaIPage');
    this._salidaIProvider.getSalidasIAJugar(this.id).subscribe(
      res=>{
          
          this.salida=res.result;
          console.log(this.salida);
      },
      e=>{
          console.log(e);
      }
    );
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '1');
    
    this.navCtrl.push(VerSalidaIPage);

  }

}
