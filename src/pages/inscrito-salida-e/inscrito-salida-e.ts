import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VerSalidaEPage } from './../ver-salida-e/ver-salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SalidaEProvider } from '../../providers/salida-e/salida-e';


@IonicPage()
@Component({
  selector: 'page-inscrito-salida-e',
  templateUrl: 'inscrito-salida-e.html',
})
export class InscritoSalidaEPage {

  salidas:any = [];
  data:any;
  idEquipo:any;
  deportes:any = [];

  aviso:any = 0;

  form: FormGroup;

  constructor(public navCtrl: NavController, 
              private salidaProvider: SalidaEProvider,
              public navParams: NavParams,
              private fb: FormBuilder,
              public alertCtrl: AlertController) {

                this.form = this.fb.group({
                  idDeporte: new FormControl()
                });
  }

  ionViewWillEnter(){
    this.idEquipo = sessionStorage.getItem('idEquipo');
    this.data = {
      idDeporte : sessionStorage.getItem('idDeporte'),
      idEquipo : this.idEquipo
    };

    this.salidaProvider.getDeportes()
      .subscribe(
        res=>{
          this.deportes = res.result;
        },
        e=>{
          console.log(e);
          this.deportes = [];
        }
      );

      this.getSalidas();
    
  }

  getSalidas(){
    this.aviso = 0;
    this.salidas =[];
    this.salidaProvider.getSalidasJugar(this.data)
      .subscribe(
        res=>{
          this.salidas = res.result;
        },
        e=>{
          console.log(e);
          this.aviso = 1;
        }
      );
  }

  buscar(){
    this.aviso = 0;
    this.data = {
      idDeporte : this.form.value.idDeporte,
      idEquipo : sessionStorage.getItem('idEquipo')
    };
    console.log(this.data);
    if (this.form.value.idDeporte !=0){

      this.salidaProvider.getSalidasJugarD(this.data)
        .subscribe(
          res=>{
            this.salidas = res.result;
            console.log(this.salidas);
          },
          e=>{
            console.log(e);
            this.aviso = 1;
            this.salidas = [];
          }
        );
    }else{
      this.getSalidas();
    }
  }

  ver(idSalida){
    this.salidaProvider.setSalidaE(idSalida);
    this.salidaProvider.setIdVer(1);
    this.navCtrl.push(VerSalidaEPage);
  }

  eliminar(idSalida:any,i:any){
    console.log('entro');

    this.salidaProvider.deleteSalidaEquipo(idSalida,this.idEquipo)
      .subscribe(
        res=>{
          console.log(res);
          this.salidas.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      )

    
  }

  showAlert(idSalida:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de salir este Evento?',
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscritoSalidaEPage');
  }

}
