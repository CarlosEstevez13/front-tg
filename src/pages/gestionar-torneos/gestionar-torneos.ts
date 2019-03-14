import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { EditarTorneoPage } from './../editar-torneo/editar-torneo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';

/**
 * Generated class for the GestionarTorneosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gestionar-torneos',
  templateUrl: 'gestionar-torneos.html',
})
export class GestionarTorneosPage {

  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  torneos:any = [];
  tempTorneos:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private fb: FormBuilder,
              public torneoProvider: TorneosProvider,
              public alertCtrl: AlertController) {
                this.form = this.fb.group({
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3),
                  tipo: new FormControl(2)
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarTorneosPage');
  }
  ionViewWillEnter(){
    this.torneoProvider.getDeportes()
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

  ver(idTorneo){
    this.torneoProvider.setIdTorneo(idTorneo);
    this.torneoProvider.setIdVer(1);
    this.navCtrl.push(VerTorneoPage);
  }

  buscar(){
    this.aviso = 0;
      this.getTorneos();
      if(this.torneos.length == 0){
        this.aviso = 1;
      }

  }

  getTorneos(){
    this.torneoProvider.getTorneosAdmin()
      .subscribe(
        res=>{
          this.torneos = res.result;
          this.buscarFiltro();
            if(this.torneos.length == 0){
              this.aviso = 1;
            }
        },
        e=>{
          this.aviso =1;
          console.log(e);
        }
      );
  }


 /*  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    this.tempTorneos = this.torneos;
    // if the value is an empty string don't filter the items
    setTimeout(
      ()=>{
        if (val && val.trim() != '') {
          this.torneos = this.torneos.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }else{
          this.torneos = this.tempTorneos;
        }
      },150
    );
    
  } */

  buscarFiltro(){
    if(this.form.value.idDeporte != 0){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        if(this.torneos[i].idDeporte==this.form.value.idDeporte){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro deporte');
        }
      }
      this.torneos = torneoBusqueda;
    }
    if(this.form.value.genero != 3){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        
        if(this.torneos[i].idGenero==this.form.value.genero){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro genero');
        }
      }
      this.torneos = torneoBusqueda;
    }
    if(this.form.value.tipo != 2){
      let torneoBusqueda = [];
      for(let i in this.torneos){
        if(this.torneos[i].individual==this.form.value.tipo){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro tipo');
        }
      }
      this.torneos = torneoBusqueda;
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

  eliminar(idTorneo:any,i:any){
    console.log('entro');
    
    this.torneoProvider.deleteTorneo(idTorneo)
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

  editar(idTorneo){
    this.torneoProvider.setIdTorneo(idTorneo);
    this.navCtrl.push(EditarTorneoPage);
  }
  

}
