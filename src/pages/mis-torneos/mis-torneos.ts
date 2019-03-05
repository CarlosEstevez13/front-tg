import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EditarTorneoPage } from './../editar-torneo/editar-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EquiposInscritosPage } from '../equipos-inscritos/equipos-inscritos';

/**
 * Generated class for the MisTorneosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-torneos',
  templateUrl: 'mis-torneos.html',
})
export class MisTorneosPage {

  torneos:any;
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              private torneoService: TorneosProvider,
              public alertCtrl: AlertController) {
                this.form = this.fb.group({
                  idDeporte: new FormControl()
                });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MisTorneosPage');
    this.torneoService.getDeportes()
      .subscribe(
        res=>{
          this.deportes = res.result;
        },
        e=>{
          console.log(e);
          this.deportes = [];
        }
      );
    this.getTorneos();
  }

  getTorneos(){
    this.torneoService.getTorneosDueno(sessionStorage.getItem('idUsuario'))
      .subscribe(
        res=>{
          console.log(res);
          this.torneos = res.result;
        },
        e=>{
          console.log(e);
        }
      )
  }

  buscar(){
    this.aviso = 0;
    this.data = {
      idDeporte : this.form.value.idDeporte,
      idUsuario : sessionStorage.getItem('idUsuario')
    };
    console.log(this.data);
    if (this.form.value.idDeporte !=0){

      this.torneoService.getTorneosDuenoD(this.data)
        .subscribe(
          res=>{
            this.torneos = res.result;
            console.log(this.torneos);
          },
          e=>{
            console.log(e);
            this.aviso = 1;
            this.torneos = [];
          }
        );
    }else{
      this.getTorneos();
    }
  }

  showAlert(idTorneo:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este torneo!',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idTorneo,i)
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


  editar(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.navCtrl.push(EditarTorneoPage);
  }

  participantes(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.navCtrl.push(EquiposInscritosPage);
  }

  ionViewWillEnter(){
    this.getTorneos();
  }

  eliminar(idTorneo:any,i:any){
    console.log('entro');

    this.torneoService.deleteTorneoEquipos(idTorneo)
      .subscribe(
        res=>{
          this.torneoService.deleteTorneo(idTorneo)
            .subscribe(
              res=>{
                console.log(res);
                this.torneos.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        },
        e=>{
          this.torneoService.deleteTorneo(idTorneo)
            .subscribe(
              res=>{
                console.log(res);
                this.torneos.splice(i,1);
              },
              e=>{
                console.log(e);
              }
            );
        }
      )

    
  }

}
