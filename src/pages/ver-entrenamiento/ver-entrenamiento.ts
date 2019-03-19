import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';

/**
 * Generated class for the VerEntrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-entrenamiento',
  templateUrl: 'ver-entrenamiento.html',
})
export class VerEntrenamientoPage {

  id:any;
  salida:any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _salidaIProvider : SalidaIProvider) {

              this.id = sessionStorage.getItem('idUsuario')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad VerEntrenamientoPage');
    this._salidaIProvider.getSalidasIAJugarEntre(this.id).subscribe(
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
