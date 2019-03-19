import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-torneos-arbitrar',
  templateUrl: 'torneos-arbitrar.html',
})
export class TorneosArbitrarPage {

  torneos:any =[];
  deportes:any = [];
  idUsuario:any;
  aviso = 0;
  form: FormGroup;

  constructor(public navCtrl: NavController,
              private torneosProvider: TorneosProvider,
              private fb: FormBuilder,
              public navParams: NavParams) {
                this.form = this.fb.group({
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3),
                  tipo: new FormControl(2)
                });
              } 
  ionViewWillEnter(){
    this.idUsuario = sessionStorage.getItem('idUsuario'); 
    this.torneosProvider.getDeportes()
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
    this.torneosProvider.setIdTorneo(idTorneo);
    this.torneosProvider.setIdVer(1);
    this.navCtrl.push(VerTorneoPage);
  }

  getTorneos(){
    this.torneosProvider.getTorneosArbitrar(this.idUsuario)
      .subscribe(
        res=>{
          console.log(res);
          let hoy = new Date();
          console.log(res);
          let temp:any = [];
          for(let i in res.result){
            console.log(res.result[i].fechaInicio);
            let vectorFecha = res.result[i].fechaInicio.split('-');
            let fecha = new Date(vectorFecha[0], (vectorFecha[1]-1), vectorFecha[2]);
            if(fecha> hoy)
              {
                temp.push(res.result[i]);
              }
          }
          this.torneos = temp;
          this.buscarFiltro();
          if(this.torneos.length == 0){
            this.aviso = 1;
          }
        },
        e=>{
          console.log(e);
          this.aviso=1;
        }
      );
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TorneosArbitrarPage');
  }

}
