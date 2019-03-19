
import { SalidaIProvider } from '../../providers/salida-i/salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditarSalidasIPage } from '../editar-salidas-i/editar-salidas-i';

/**
 * Generated class for the MisSalidasIPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-salidas-i',
  templateUrl: 'mis-salidas-i.html',
})
export class MisSalidasIPage {
  id:any;
  salida:any;
  todas : any =[];
  idDeporte:any;
  deportes:any = [];
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public _salidaIProvider : SalidaIProvider) {
              this.id = sessionStorage.getItem('idUsuario')
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad MisSalidasIPage');
    this._salidaIProvider.getDeporte().subscribe(
      res=>{
        this.deportes=res.result;
        console.log(res.result);
    },e=>{
      
      console.log(e);

    });
    this.getSalidasDisponibles();
  }

  getSalidasDisponibles(){
    this._salidaIProvider.getMisSalidas(this.id).subscribe(
      res=>{
          
          this.salida=res.result;
          console.log(this.salida);
          this.todas = this.salida;
      },
      e=>{
          console.log(e);
      }
    );
  }

  buscar(){
    console.log(this.idDeporte);
    if(this.idDeporte==0){
    this.getSalidasDisponibles();
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



  editar(idSalida:any, entrenamiento:any, deporte:any){
    sessionStorage.setItem('idSalidaI',idSalida);
    sessionStorage.setItem('entrenamiento',entrenamiento);
    sessionStorage.setItem('deporte', deporte);
    this.navCtrl.push(EditarSalidasIPage);
  }

  eliminar(idSalida:any,i){
    console.log('entro');

    this._salidaIProvider.deleteSalidaIUsuario(idSalida)
      .subscribe(
        res=>{
          console.log(res);
          this._salidaIProvider.deleteSalidaI(idSalida)
            .subscribe(
              res=>{
                console.log(res);
                this.salida.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          console.log(e);
          this._salidaIProvider.deleteSalidaI(idSalida)
            .subscribe(
              res=>{
                console.log(res);
                this.salida.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        }
      )

    
  }

  showAlert(idSalida:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar esta Salida?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idSalida,i)
        }
      },
        {
          text: 'No',
          handler: () => {
            //this.navCtrl.pop();
          } 
          }
    ]
      
    });
    alert.present();
  }

}
