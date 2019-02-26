import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
              public torneoService: TorneosProvider,
              public alertCtrl: AlertController) {
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

  showAlert(idTorneo:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este torneo!',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idTorneo,i)
          //this.navCtrl.pop();
        }
      },
        {
          text: 'No',
          handler: () => {
            //this.navCtrl.pop();
          } 
          }
    ]
      
    });
    alert.present();
  }


  eliminar(idTorneo:any,i:any){
    console.log('entro');

    this.torneoService.deleteTorneoEquipo(idTorneo,this.idEquipo)
      .subscribe(
        res=>{
          this.torneos.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      )

    
  }

  ver(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.torneoService.setIdVer(1);
    this.navCtrl.push(VerTorneoPage);
  }

}
