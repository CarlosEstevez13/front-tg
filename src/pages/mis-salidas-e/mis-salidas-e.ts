import { EditarSalidaEPage } from './../editar-salida-e/editar-salida-e';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mis-salidas-e',
  templateUrl: 'mis-salidas-e.html',
})
export class MisSalidasEPage {

  salidas:any = [];
  data:any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private salidaProvider: SalidaEProvider,
              public alertCtrl: AlertController) {
                
  }

  ionViewWillEnter(){
    this.data = {
      idDeporte : sessionStorage.getItem('idDeporte'),
      idEquipo : sessionStorage.getItem('idEquipo')
    };
    this.salidaProvider.getMisSalidas(this.data)
      .subscribe(
        res=>{
          this.salidas = res.result;
        },
        e=>{
          console.log(e);
        }
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisSalidasEPage');
  }

  editar(idSalida){
    console.log(idSalida);
    this.salidaProvider.setSalidaE(idSalida);
    this.navCtrl.push(EditarSalidaEPage);
  }
  
  eliminar(idSalida:any,i:any){
    console.log('entro');

    this.salidaProvider.deleteSalidaEquipos(idSalida)
      .subscribe(
        res=>{
          this.salidaProvider.deleteSalida(idSalida)
            .subscribe(
              res=>{
                console.log(res);
                this.salidas.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          this.salidaProvider.deleteSalida(idSalida)
            .subscribe(
              res=>{
                console.log(res);
                this.salidas.splice(i,1);
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
          //this.navCtrl.pop();
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
