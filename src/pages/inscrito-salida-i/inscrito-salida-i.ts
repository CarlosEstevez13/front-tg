import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InscritoSalidaIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscrito-salida-i',
  templateUrl: 'inscrito-salida-i.html',
})
export class InscritoSalidaIPage {
  id:any;
  salida:any;
  todas:any;
  idDeporte:any;
  deportes:any = [];

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               public _salidaIProvider : SalidaIProvider) {
                 
            this.id = sessionStorage.getItem('idUsuario')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoaaad InscritoSalidaIPage');
    this._salidaIProvider.getDeporte().subscribe(
      res=>{
        this.deportes=res.result;
        console.log(res.result);
    },e=>{
      
      console.log(e);

    });
    this.salidadInscritas();
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '1');
    
    this.navCtrl.push(VerSalidaIPage);

  }

  salidadInscritas(){
    this._salidaIProvider.getSalidasIAJugar(this.id).subscribe(
      res=>{
          
          this.salida=res.result;
          console.log(this.salida);
      },
      e=>{
          console.log(e);
      }
    );
  }
  

  buscar(){
    console.log(this.idDeporte);
    if(this.idDeporte==0){
    this.salidadInscritas();
    }
    else{
      this.salida= this.todas;
      let disponiblesFiltrada =[];
      for(let i in this.salida){
        if(this.salida[i].idDeporte == this.idDeporte){
          disponiblesFiltrada.push(this.salida[i]);
        }
      }
      this.salida= disponiblesFiltrada;
      console.log(this.salida);
    }
    
  }
  

}
