import { UbicacionPage } from './../ubicacion/ubicacion';
import { VerEquipoPage } from './../ver-equipo/ver-equipo';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerSalidaEPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ver-salida-e',
  templateUrl: 'ver-salida-e.html',
})
export class VerSalidaEPage {

  salida:any = {
    nombre:'',
    fecha:'',
    hora:'',
    horaFin:'',
    latitud:0,
    longitud:0,
    descripcion: ''
  };

  idEquipo = sessionStorage.getItem('idEquipo');
  idVer:any;
  vectorFecha:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private salidaService: SalidaEProvider) {
                this.salidaService.getSalida()
                  .subscribe(
                    res=>{  
                      this.salida = res.result[0];
                      console.log(this.salida);
                      sessionStorage.setItem('direccion',this.salida.direccion);
                    },
                    e=>{
                      console.log(e);
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerSalidaEPage');
  }

  ionViewWillEnter(){
    this.idVer = this.salidaService.getIdVer();
    console.log(this.idVer);
  }

  volver(){
    this.navCtrl.pop()
  }


  ubicacion(lat,lng, direccion){
    sessionStorage.setItem('tempLat',`${lat}`);
    sessionStorage.setItem('tempLng',`${lng}`);
    sessionStorage.setItem('direccion',`${direccion}`);
    this.navCtrl.push(UbicacionPage);
  }

  verEquipo(idEquipo:any){
    sessionStorage.setItem('idEquipo',idEquipo);
    sessionStorage.setItem('temp','1');
    this.navCtrl.push(VerEquipoPage);
  }

  unirse(){
    let data = {
      idSalidaE : this.salida.idSalidaE,
      idEquipo :  this.idEquipo
    }
    this.salidaService.addSalidaEquipo(data)
      .subscribe(
        res=>{
          console.log(res);
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      );
  }

}
