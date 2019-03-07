import { EditarEquipoPage } from './../editar-equipo/editar-equipo';
import { VerEquipoPage } from './../ver-equipo/ver-equipo';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the GestionarEquipoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionar-equipo',
  templateUrl: 'gestionar-equipo.html',
})
export class GestionarEquipoPage {

  equipos:any = [];

  constructor(public navCtrl: NavController, 
              private equipoService: EquipoProvider,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarEquipoPage');
    this.equipoService.getEquipos1()
      .subscribe(
        res=>{
          this.equipos = res.result;
          console.log(res.result);

        },
        e=>{
          console.log(e);
        }
      );
  }

  ionViewWillEnter(){
    this.equipoService.getEquipos1()
      .subscribe(
        res=>{
          this.equipos = res.result;
          console.log(res.result);

        },
        e=>{
          console.log(e);
        }
      );
  }

  eliminar(idEquipo:any,i:any){
    console.log('entro');
    this.equipoService.deleteEquipo(idEquipo)
      .subscribe(
        res=>{
          console.log(res);
          this.equipos.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      );
  }

  showAlert(idSalida:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar esta Salida?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idSalida,i)
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

  editar(idEquipo){
    this.equipoService.getInfoEquipo(idEquipo)
    .subscribe(
      res => {
        let infoEquipo = res.result[0];
        this.equipoService.cacheEquipo(infoEquipo);
        this.navCtrl.push(EditarEquipoPage);
      }, e => {
        console.log(e);
      }
    );
  }

  verEquipo(idEquipo:any){
    sessionStorage.setItem('idEquipo',idEquipo);
    sessionStorage.setItem('temp','1');
    this.navCtrl.push(VerEquipoPage);
  }


}
