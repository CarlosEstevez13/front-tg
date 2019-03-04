import { VerEquipoPage } from './../ver-equipo/ver-equipo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MarcadorSalidaEPage } from './../marcador-salida-e/marcador-salida-e';
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

  aviso = 0;
  error = 0;
  salidas:any = [];
  data:any;
  deportes:any = [];
  form: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private salidaProvider: SalidaEProvider,
              public alertCtrl: AlertController) {

                this.form = this.fb.group({
                  idDeporte: new FormControl()
                });
                
  }

  ionViewWillEnter(){
    this.salidas = [];
    this.data = {
      idDeporte : sessionStorage.getItem('idDeporte'),
      idEquipo : sessionStorage.getItem('idEquipo')
    };

    console.log(this.data);

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

        this.misSalidas();
  }


  verEquipo(idEquipo:any){
    sessionStorage.setItem('idEquipo',idEquipo);
    sessionStorage.setItem('temp','1');
    this.navCtrl.push(VerEquipoPage);
  }


  misSalidas(){
    this.salidas = [];
    this.salidaProvider.getMisSalidas(this.data)
    .subscribe(
      res=>{
        this.salidas = res.result;
        console.log(this.salidas);
        this.SalidasSinRival();
      },
      e=>{
        console.log(e);
        this.error = 1;
        this.SalidasSinRival();
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

      this.salidaProvider.getMisSalidasD(this.data)
        .subscribe(
          res=>{
            this.salidas = res.result;
            console.log(this.salidas);
            this.SalidasSinRivalD();
          },
          e=>{
            console.log(e);
            this.error = 1;
            this.salidas = [];
            this.SalidasSinRivalD();
          }
        );
    }else{
      this.misSalidas();
    }
  }

  marcador(idSalida){
    this.salidaProvider.setSalidaE(idSalida);
    this.navCtrl.push(MarcadorSalidaEPage);
  }

  SalidasSinRival(){
    this.salidaProvider.getMisSalidas_1(this.data)
      .subscribe(
        res=>{
          this.salidas = this.salidas.concat(res.result);
          console.log(this.salidas);
        },
        e=>{
          if(this.error == 1){

            this.aviso = 1;
          }
        }
      )
  }

  SalidasSinRivalD(){
    console.log(this.data);
    this.salidaProvider.getMisSalidasD_1(this.data)
    .subscribe(
      res=>{
        console.log(res.result);
          this.salidas = this.salidas.concat(res.result);
          console.log(this.salidas);
        },
        e=>{
          if(this.error == 1){
            this.salidas = [];
            this.aviso = 1;
          }
        }
      )
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
