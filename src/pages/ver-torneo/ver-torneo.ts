import { ParticipantesTorneoPage } from './../participantes-torneo/participantes-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the VerTorneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-torneo',
  templateUrl: 'ver-torneo.html',
})
export class VerTorneoPage {

  torneo:any = {
    nombre: '',
    descripcion: '',
    reglamento: '',
    maxEquipos: 0,
    fechaInicio: ''
  };
  idEquipo:any;

  idVer:any;

  reglamento:any = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private iab : InAppBrowser,
              private torneoProvider: TorneosProvider) {
                this.idEquipo = sessionStorage.getItem('idEquipo');
                this.torneoProvider.getTorneo()
                  .subscribe(
                    res=>{
                      console.log(res);
                      this.torneo = res.result[0];
                      if(this.torneo.reglamento != 'null'){
                        this.reglamento = 1;
                      }

                    },
                    e=>{
                      console.log(e);
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerTorneoPage');
  }

  ionViewWillEnter(){
    this.idVer = this.torneoProvider.getIdVer();
  }

  verInscritos(){
    console.log('hola');
    this.navCtrl.push(ParticipantesTorneoPage);
  }

  salir(){
    this.navCtrl.pop();
  }
  
  verPdf(nombre){
    console.log('entro');
    const browser = this.iab.create( `http://10.14.21.84:3002/pdf/${nombre}.pdf`, '_system');

  }

  unirse(){
    let data = {
      idEquipo: this.idEquipo,
      idTorneo: this.torneo.idTorneo
    }
    this.torneoProvider.addEquipoTorneo(data)
      .subscribe(
        res=>{
          console.log('se unio');
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      )
  }

}
