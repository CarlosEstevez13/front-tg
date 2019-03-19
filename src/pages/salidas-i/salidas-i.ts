import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';

/**
 * Generated class for the SalidasIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas-i',
  templateUrl: 'salidas-i.html',
})
export class SalidasIPage {

  id:any;
  disponibles: any =[];
  todas : any = [];
  idDeporte:any;
  deportes:any = [];
  idGenero:any;
  busqueda:any=0;
  

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _salidaIProvider : SalidaIProvider) {

            this.id = sessionStorage.getItem('idUsuario');
  }

  ionViewWillEnter() {
    this.disponibles = [];
    console.log('ionViewDidLoad SalidasIPage');
    this._salidaIProvider.getDeporte().subscribe(
      res=>{
        this.deportes=res.result;
        console.log(res.result);
    },e=>{
      
      console.log(e);

    });
    this.salidasDisponibles();
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '0');
    
    this.navCtrl.push(VerSalidaIPage);

  }

   salidasDisponibles(){
    this._salidaIProvider.getSalidasDisponibles(this.id).subscribe(
      res=>{
          let hoy = new Date();
          console.log(res);
          let temp:any = [];
          for(let i in res.result){
            let vectorFecha = res.result[i].fecha.split('-');
            let fecha = new Date(vectorFecha[0], (vectorFecha[1]-1), vectorFecha[2]);

            if(fecha> hoy)
              {
                console.log('entro');
                temp.push(res.result[i]);
              }
          }
          this.disponibles = temp;  

          this.todas = this.disponibles;
      },
      e=>{
          console.log(e);
      }
    );
  }

  buscar(){
    console.log(this.idDeporte);
    if(this.idDeporte==0){
    this.salidasDisponibles();
    }
    else{
      this.disponibles= this.todas;
      let disponiblesFiltrada =[];
      for(let i in this.disponibles){
        if(this.disponibles[i].idDeporte == this.idDeporte){
          disponiblesFiltrada.push(this.disponibles[i]);
        }
      }
      this.disponibles= disponiblesFiltrada;
      console.log(this.disponibles);
    }
    
  }

  bucagenero(){
    console.log(this.idGenero);

      this.disponibles= this.todas;
      let disponiblesFiltrada =[];
      for(let i in this.disponibles){
        if(this.disponibles[i].genero == this.idGenero){
          disponiblesFiltrada.push(this.disponibles[i]);
        }
      }
      this.disponibles= disponiblesFiltrada;
      console.log(this.disponibles);
  }
}
