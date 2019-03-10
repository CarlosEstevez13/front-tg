import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';

/**
 * Generated class for the BuscarEntrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar-entrenamiento',
  templateUrl: 'buscar-entrenamiento.html',
})
export class BuscarEntrenamientoPage {

  id:any;
  disponibles: any =[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _salidaIProvider : SalidaIProvider) {

              this.id = sessionStorage.getItem('idUsuario');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad BuscarEntrenamientoPage');
    this._salidaIProvider.getSalidasDisponiblesEntre(this.id).subscribe(
      res=>{
          this.disponibles=res.result;
          console.log(this.disponibles);
      },
      e=>{
          console.log(e);
          this.disponibles=null;
      }
    );
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '0');
    
    this.navCtrl.push(VerSalidaIPage);
  
  }

 

}
