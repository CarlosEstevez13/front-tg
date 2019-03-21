import { EquipoProvider } from './../../providers/equipo/equipo';
import { PerfilPage } from './../perfil/perfil';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the PatrocinadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patrocinadores',
  templateUrl: 'patrocinadores.html',
})
export class PatrocinadoresPage {

  patrocinadores:any =[];
  aviso:any =0;

  constructor(public navCtrl: NavController, 
              private equipoProvider: EquipoProvider,
              private torneoService: TorneosProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JuradoPage');
  }

  ionViewWillLoad() {
    this.torneoService.getTorne_Juez()
      .subscribe(
        res=>{
          this.patrocinadores = res.result;
          console.log(this.patrocinadores);
        },
        e=>{
          console.log(e);
          this.aviso =1;
        }
      );
  }

  verUsuario(idUsuario){
    this.equipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }


}
