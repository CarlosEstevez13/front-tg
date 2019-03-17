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
        let hoy = new Date();
        console.log(res);
        let temp:any = [];
        for(let i in res.result){
          let vectorFecha = res.result[i].fecha.split('-');
          let fecha = new Date(vectorFecha[0], (vectorFecha[1]-1), vectorFecha[2]);
          if(fecha> hoy)
            {
              temp.push(res.result[i]);
            }
        }
        this.disponibles = temp;
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
