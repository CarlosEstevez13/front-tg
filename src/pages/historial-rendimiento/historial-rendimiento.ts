import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-historial-rendimiento',
  templateUrl: 'historial-rendimiento.html',
})
export class HistorialRendimientoPage {

  rendimientos:any;

  data: any;

  constructor(public navCtrl: NavController, 
              public usuarioService: UsuarioProvider,
              public navParams: NavParams) {
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialRendimientoPage');
  }


  ionViewWillEnter(){
    this.usuarioService.getRendimientos(sessionStorage.getItem('idUsuario'))
      .subscribe(
        res=>{
          console.log(res);
          this.rendimientos = res.result;
        },
        e=>{
          console.log(e);
        }
      );
  }

}
