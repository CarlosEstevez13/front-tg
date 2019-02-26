import { VerSalidaEPage } from './../ver-salida-e/ver-salida-e';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SalidasEPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas-e',
  templateUrl: 'salidas-e.html',
})
export class SalidasEPage {

  salidas:any = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private salidasProvider: SalidaEProvider) {
              
  }

  ionViewWillEnter(){
    this.salidasProvider.getSalidasEInscribirse()
                .subscribe(
                  res=>{
                    console.log(res);
                    this.salidas = res.result;
                  },
                  e=>{
                    console.log(e);
                  }
                );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalidasEPage');
  }

  ver(idSalidaE){
    this.salidasProvider.setSalidaE(idSalidaE);
    this.salidasProvider.setIdVer(0);
    this.navCtrl.push(VerSalidaEPage);
  }

}
