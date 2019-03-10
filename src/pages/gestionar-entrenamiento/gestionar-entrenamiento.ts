import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { EditarSalidasIPage } from './../editar-salidas-i/editar-salidas-i';
import { VerSalidaIPage } from './../ver-salida-i/ver-salida-i';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SalidaIProvider } from '../../providers/salida-i/salida-i';

/**
 * Generated class for the GestionarEntrenamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionar-entrenamiento',
  templateUrl: 'gestionar-entrenamiento.html',
})
export class GestionarEntrenamientoPage {

  salidas:any = [];
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              private fb: FormBuilder,
              private salidasProvider: SalidaIProvider, 
              public navParams: NavParams) {
                this.form = this.fb.group({
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3)
                });
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarSalidasIPage');
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
    this.salidasProvider.getEntrenamientos()
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

  editar(idSalida:any, entrenamiento:any){
    sessionStorage.setItem('idSalidaI',idSalida);
    sessionStorage.setItem('entrenamiento',entrenamiento)
    this.navCtrl.push(EditarSalidasIPage);
  }

  eliminar(idSalida:any, i){
    console.log('entro');

    this.salidasProvider.deleteSalidaIUsuario(idSalida)
      .subscribe(
        res=>{
          console.log(res);
          this.salidasProvider.deleteSalidaI(idSalida)
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
          console.log(e);
        }
      )

    
  }

  ver(id:any){
    sessionStorage.setItem("idSalidaI", id);
    sessionStorage.setItem("unir", '2');
    
    this.navCtrl.push(VerSalidaIPage);

  }

  showAlert(idSalida:any,i) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este Entrenamiento?',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idSalida,i);
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
