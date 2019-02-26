import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistorialProvider } from '../../providers/historial/historial';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  id:any;
  error:any;
  err:any;
  public salida = [];
  public historial = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _historialProvider: HistorialProvider) {
  
              this.id = sessionStorage.getItem('idUsuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  ionViewWillEnter(){
    console.log('entro');
    this._historialProvider.getHistorial(this.id).subscribe(res=> {
      this.historial = res.result;
      console.log(this.historial);

  },
  e=>{
    console.log(e);
    this.error=e;

  });
  }



}
