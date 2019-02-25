import { EditarTorneoPage } from './../editar-torneo/editar-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EquiposInscritosPage } from '../equipos-inscritos/equipos-inscritos';

/**
 * Generated class for the MisTorneosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-torneos',
  templateUrl: 'mis-torneos.html',
})
export class MisTorneosPage {

  torneos:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private torneoService: TorneosProvider,
              public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisTorneosPage');
    this.getTorneos();
  }

  getTorneos(){
    this.torneoService.getTorneosDueno(sessionStorage.getItem('idUsuario'))
      .subscribe(
        res=>{
          console.log(res);
          this.torneos = res.result;
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


  editar(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.navCtrl.push(EditarTorneoPage);
  }

  participantes(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.navCtrl.push(EquiposInscritosPage);
  }

  ionViewWillEnter(){
    this.getTorneos();
  }

  eliminar(idTorneo:any,i:any){
    console.log('entro');

    this.torneoService.deleteTorneoEquipos(idTorneo)
      .subscribe(
        res=>{
          this.torneoService.deleteTorneo(idTorneo)
            .subscribe(
              res=>{
                console.log(res);
                this.torneos.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          this.torneoService.deleteTorneo(idTorneo)
            .subscribe(
              res=>{
                console.log(res);
                this.torneos.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        }
      )

    
  }

}
