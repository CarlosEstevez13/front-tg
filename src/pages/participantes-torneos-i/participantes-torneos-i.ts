import { PerfilPage } from './../perfil/perfil';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';



@IonicPage()
@Component({
  selector: 'page-participantes-torneos-i',
  templateUrl: 'participantes-torneos-i.html',
})
export class ParticipantesTorneosIPage {

  usuarios:any =[];
  tiene:any = 1;

  constructor(public navCtrl: NavController, 
              private torneoService: TorneosProvider,
              private equipoProvider: EquipoProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticipantesTorneoPage');
  }
  ionViewWillLoad(){
    this.getParticipantes();
  }


  getParticipantes(){
    this.torneoService.getTorneoI_Participantes()
      .subscribe(
        res=>{
          this.usuarios = res.result;
          console.log(this.usuarios);
        },
        e=>{
          console.log(e);
          this.tiene = 0;
        }
      )
  }

  verUsuario(idUsuario){
    this.equipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }
}
