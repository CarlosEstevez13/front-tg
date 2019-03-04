import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EquipoProvider } from '../../providers/equipo/equipo';
import { IntegrantesPage } from '../integrantes/integrantes';


@IonicPage()
@Component({
  selector: 'page-ver-equipo',
  templateUrl: 'ver-equipo.html',
})
export class VerEquipoPage {

  idEquipo:any;
  idDeporte:any;
  equipo:any = {
    idEquipo:0,
    nombre: '',
    descripcion: '',
    nroIntegrantes: '',
    idDeporte: 0,
  }
  aviso =0;

  historial:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private equipoService: EquipoProvider,
              private salidaService: SalidaEProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerEquipoPage');
  }

  integrantes(){
    this.navCtrl.push(IntegrantesPage);
  }

  ionViewWillLeave(){
    if(sessionStorage.getItem('temp') == '1'){
      console.log('entro')
      sessionStorage.setItem('idEquipo',this.equipoService.getIdEquipo());
      sessionStorage.removeItem('temp');
    }
    console.log('salio!')
  }

  ionViewWillEnter(){
    this.idEquipo = sessionStorage.getItem('idEquipo');
    this.idDeporte = sessionStorage.getItem('idDeporte');

    this.equipoService.getInfoEquipo_1(this.idEquipo)
      .subscribe(
        res=>{
          this.equipo = res.result[0];
        },
        e=>{
          console.log(e);
        }
      );
  
    let data = {
      idEquipo: this.idEquipo,
      idDeporte: this.idDeporte
    }

    this.aviso=0;
    this.salidaService.getSalidasHistorial(data)
      .subscribe(
        res=>{
          this.historial = res.result;
          console.log(this.historial);
        },
        e=>{
          console.log(e);
          this.aviso = 1;
        }
      );
  }

}
