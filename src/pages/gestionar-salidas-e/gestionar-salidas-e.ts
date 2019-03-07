import { EditarSalidaEPage } from './../editar-salida-e/editar-salida-e';
import { VerSalidaEPage } from './../ver-salida-e/ver-salida-e';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SalidaEProvider } from '../../providers/salida-e/salida-e';



@IonicPage()
@Component({
  selector: 'page-gestionar-salidas-e',
  templateUrl: 'gestionar-salidas-e.html',
})
export class GestionarSalidasEPage {

  salidas:any = [];
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
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
    this.salidasProvider.getSalidas()
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
    this.salidasProvider.setIdVer(1);
    this.navCtrl.push(VerSalidaEPage);
  }

  editar(idSalida){
    console.log(idSalida);
    this.salidasProvider.setSalidaE(idSalida);
    this.navCtrl.push(EditarSalidaEPage);
  }
  
  eliminar(idSalida:any,i:any){
    console.log('entro');

    this.salidasProvider.deleteSalidaEquipos(idSalida)
      .subscribe(
        res=>{
          this.salidasProvider.deleteSalida(idSalida)
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
          this.salidasProvider.deleteSalida(idSalida)
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
