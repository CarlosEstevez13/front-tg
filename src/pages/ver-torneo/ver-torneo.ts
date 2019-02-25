import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private torneoProvider: TorneosProvider) {
                this.idEquipo = sessionStorage.getItem('idEquipo');
                this.torneoProvider.getTorneo()
                  .subscribe(
                    res=>{
                      console.log(res);
                      this.torneo = res.result[0];
                    },
                    e=>{
                      console.log(e);
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerTorneoPage');
  }

  salir(){
    this.navCtrl.pop();
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
