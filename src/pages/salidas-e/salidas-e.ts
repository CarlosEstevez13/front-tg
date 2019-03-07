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
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3)
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

  buscarFiltro(){
    if(this.form.value.idDeporte != 0){
      let salidaBusqueda = [];
      for(let i in this.salidas){
        if(this.salidas[i].idDeporte==this.form.value.idDeporte){
          salidaBusqueda.push(this.salidas[i]);
          console.log('entro');
        }
      }
      this.salidas = salidaBusqueda;
    }
    if(this.form.value.genero != 3){
      let salidaBusqueda = [];
      for(let i in this.salidas){
        if(this.salidas[i].genero==this.form.value.genero){
          salidaBusqueda.push(this.salidas[i]);
          console.log('entro');
        }
      }
      this.salidas = salidaBusqueda;
    }
  }

  buscar(){
    this.aviso = 0;
    this.getSalidas();
   
  }

  getSalidas(){
    this.aviso = 0;
    this.salidas = [];
    this.salidasProvider.getSalidasEInscribirse()
                .subscribe(
                  res=>{
                    console.log(res);
                    this.salidas = res.result;
                    this.buscarFiltro();
                    if(this.salidas.length == 0){
                      this.aviso =1;
                    }
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
