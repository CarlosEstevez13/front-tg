import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the InscritoTorneoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscrito-torneo',
  templateUrl: 'inscrito-torneo.html',
})
export class InscritoTorneoPage {

  idEquipo = sessionStorage.getItem('idEquipo');
  torneos:any = [];
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              public torneoService: TorneosProvider,
              public alertCtrl: AlertController) {
                this.form = this.fb.group({
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3),
                  tipo: new FormControl(2)
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscritoTorneoPage');
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
    this.aviso =0;
    this.torneoService.getTorneosDeEquipo(this.idEquipo)
      .subscribe(
        res=>{
          this.torneos = res.result;
          console.log(this.torneos);
          this.buscarFiltro();
          if(this.torneos.length == 0){
            this.aviso = 1;
          }
        },
        e=>{
          console.log(e);
          this.aviso =1
        }
      )
  }

  buscarFiltro(){
    if(this.form.value.idDeporte != 0){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        if(this.torneos[i].idDeporte==this.form.value.idDeporte){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro');
        }
      }
      this.torneos = torneoBusqueda;
    }
    if(this.form.value.genero != 3){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        if(this.torneos[i].idGenero==this.form.value.genero){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro');
        }
      }
      this.torneos = torneoBusqueda;
    }
    if(this.form.value.tipo != 2){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        if(this.torneos[i].individual==this.form.value.tipo){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro');
        }
      }
      this.torneos = torneoBusqueda;
    }
  }

  buscar(){
    this.getTorneos();
    this.aviso = 0;
    
  }

  showAlert(idTorneo:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de salir de este torneo!',
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


  eliminar(idTorneo:any,i:any){
    console.log('entro');

    this.torneoService.deleteTorneoEquipo(idTorneo,this.idEquipo)
      .subscribe(
        res=>{
          this.torneos.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      )

    
  }

  ver(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.torneoService.setIdVer(1);
    this.navCtrl.push(VerTorneoPage);
  }

}
