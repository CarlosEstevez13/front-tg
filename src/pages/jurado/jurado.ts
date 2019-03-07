import { TorneosProvider } from './../../providers/torneos/torneos';
import { PerfilPage } from './../perfil/perfil';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JuradoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jurado',
  templateUrl: 'jurado.html',
})
export class JuradoPage {

  arbitros:any =[];


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
          this.arbitros = res.result;
          console.log(this.arbitros);
        },
        e=>{
          console.log(e);
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
