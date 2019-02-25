import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the InscritoTorneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscrito-torneo',
  templateUrl: 'inscrito-torneo.html',
})
export class InscritoTorneoPage {

  idEquipo = sessionStorage.getItem('idEquipo');
  torneos:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public torneoService: TorneosProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscritoTorneoPage');
    this.torneoService.getTorneosDeEquipo(this.idEquipo)
      .subscribe(
        res=>{
          this.torneos = res.result;
          console.log(this.torneos);
        },
        e=>{
          console.log(e);
        }
      )
  }

}
