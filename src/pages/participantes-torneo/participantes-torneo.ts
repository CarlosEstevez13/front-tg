import { VerEquipoPage } from './../ver-equipo/ver-equipo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-participantes-torneo',
  templateUrl: 'participantes-torneo.html',
})
export class ParticipantesTorneoPage {

  participantes:any =[];
  tiene:any = 1;

  constructor(public navCtrl: NavController, 
              private torneoService: TorneosProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticipantesTorneoPage');
  }
  ionViewWillLoad(){
    this.getParticipantes();
  }

  verEquipo(idEquipo:any){
    sessionStorage.setItem('idEquipo',idEquipo);
    sessionStorage.setItem('temp','1');
    this.navCtrl.push(VerEquipoPage);
  }

  getParticipantes(){
    this.torneoService.getEquiposEnTorneo()
      .subscribe(
        res=>{
          this.participantes = res.result;
          console.log(this.participantes);
        },
        e=>{
          console.log(e);
          this.tiene = 0;
        }
      )
  }

}
