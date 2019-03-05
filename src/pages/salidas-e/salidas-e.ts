import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VerSalidaEPage } from './../ver-salida-e/ver-salida-e';
import { SalidaEProvider } from './../../providers/salida-e/salida-e';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SalidasEPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salidas-e',
  templateUrl: 'salidas-e.html',
})
export class SalidasEPage {

  salidas:any = [];
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private salidasProvider: SalidaEProvider) {
                this.form = this.fb.group({
                  idDeporte: new FormControl()
                });
  }

  ionViewWillEnter(){

    this.salidasProvider.getDeportes()
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

  buscar(){
    this.aviso = 0;
    this.data = {
      idDeporte : this.form.value.idDeporte,
      idEquipo : sessionStorage.getItem('idEquipo')
    };
    console.log(this.data);
    if (this.form.value.idDeporte !=0){

      this.salidasProvider.getSalidasJugarD(this.data)
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

  getSalidas(){
    this.aviso = 0;
    this.salidas = [];
    this.salidasProvider.getSalidasEInscribirse()
                .subscribe(
                  res=>{
                    console.log(res);
                    this.salidas = res.result;
                  },
                  e=>{
                    console.log(e);
                    this.aviso =1;
                  }
                );
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalidasEPage');
  }

  ver(idSalidaE){
    this.salidasProvider.setSalidaE(idSalidaE);
    this.salidasProvider.setIdVer(0);
    this.navCtrl.push(VerSalidaEPage);
  }

}
