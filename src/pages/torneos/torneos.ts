import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { VerTorneoPage } from './../ver-torneo/ver-torneo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TorneosProvider } from '../../providers/torneos/torneos';
import { AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-torneos',
  templateUrl: 'torneos.html',
})
export class TorneosPage {

  searchQuery: string = '';
  torneos: any;
  nroEquipos:any = [];

  idDeporte= sessionStorage.getItem('idDeporte');
  idEquipo:any;
  idUsuario:any;
  idRol:any;
  equipo:any;
  torneosInscritos:any;
  deportes:any = [];
  aviso = 0;
  form: FormGroup;
  data:any;

  buscoDeporte=0;
  buscoGenero=0;
  buscoTipo=0;

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

    if(this.idEquipo == null){
      this.form.value.tipo = 1;
    }
    //this.getTorneosDeEquipo();
  }
  
  ionViewWillEnter() {
    this.torneos = [];
    this.idEquipo = sessionStorage.getItem('idEquipo');
    this.idUsuario = sessionStorage.getItem('idUsuario');
    this.idRol = sessionStorage.getItem('idRol');
    console.log('ionViewDidLoad TorneosPage');
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

    //this.getNroEquipos();
    this.getTorneos();
  }

  buscar(){
    this.aviso = 0;
    this.getNroEquipos();
    this.getTorneos();
      if(this.torneos.length == 0){
        this.aviso = 1;
      }

  }

  buscarFiltro(){
    if(this.form.value.idDeporte != 0){
      let torneoBusqueda = [];
      this.buscoDeporte =1;
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
      this.buscoTipo =1;
      for(let i in this.torneos){
        if(this.torneos[i].individual==this.form.value.tipo){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro tipo');
        }
      }
      this.torneos = torneoBusqueda;
    }

    if(this.idEquipo == '0' && this.idRol!= '4'){
      let torneoBusqueda = [];
      this.buscoTipo =1;
      for(let i in this.torneos){
        if(this.torneos[i].individual==0){
          torneoBusqueda.push(this.torneos[i]);
          console.log('entro tipo');
        }
      }
      this.torneos = torneoBusqueda;
    }

    if(this.torneos.length > 0){
      this.aviso = 0;
    }
  }
  
  getTorneosD() {
    console.log('entro a la funcion')
    this.torneoProvider.getTorneosDeporte(this.form.value.idDeporte)
        .subscribe(res=> {
          //this.torneos = res.result;
          console.log(res.result);
          this.getTorneosDeEquipo(res.result);
          
        },
        e=>{
          this.aviso =1;
          console.log('ocurrio un error');
        });
  }

  getTorneos(){
    this.aviso =0;
    this.torneoProvider.getTorneos(this.idUsuario,this.idEquipo)
        .subscribe(res=> {
          
          let hoy = new Date();
          console.log(res);
          let temp:any = [];
          for(let i in res.result){
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
            this.aviso =1;
          }
          
        },
        e=>{
          this.aviso =1;
          console.log('ocurrio un error');
        });
  }
  
 

  getNroEquipos(){
    this.torneoProvider.getNroEquiposTorneo()
        .subscribe(res=> {
          this.nroEquipos = res.result;
          console.log(this.nroEquipos);
        },
        e=>{
          console.log('ocurrio un error');
          this.nroEquipos = [];
        });
     
  }

  getNroEquiposD(){
    this.torneoProvider.getNroEquiposTorneoDeporte(this.form.value.idDeporte)
        .subscribe(res=> {
          this.nroEquipos = res.result;
          console.log(this.nroEquipos);
        },
        e=>{
          console.log('ocurrio un error');
          this.nroEquipos = [];
        });
     
  }

  getTorneosDeEquipo(torneos){
    
    this.torneoProvider.getTorneosDeEquipo(this.idEquipo)
      .subscribe(
        res=>{
              if (res.result){
              this.torneosInscritos = res.result;
              console.log(this.torneosInscritos);
              let torneosFinal= torneos;
              for (let i in torneos){
                for (let k in this.torneosInscritos){
                  if (torneos[i]['idTorneo'] == this.torneosInscritos[k]['idTorneo']){
                    console.log('entro');
                    torneosFinal.splice(i,1);
                  }
                }                
              } 
              this.torneos = torneosFinal;
              console.log(torneosFinal);

              for (let i in this.torneos){
                if (this.nroEquipos.length == 0){
                  this.torneos[i].nroEquipos = 0;
                  console.log('entro al if');
                }else{
                  console.log('entro al else');
                  for (let j in this.nroEquipos){
                     if (this.torneos[i].idTorneo == this.nroEquipos[j].idTorneo){
                       this.torneos[i].nroEquipos = this.nroEquipos[j].nroEquipos;
                       break;
                     }else{
                       this.torneos[i].nroEquipos = 0;
                     }
                  }
                }
              }

            }else{
              this.torneosInscritos = [];
            }
            this.buscarFiltro();
            if(this.torneos.length == 0){
              this.aviso = 1;
            }

            console.log(this.torneosInscritos);
            },
            e=>{
              this.torneosInscritos = [];
              console.log(this.torneosInscritos);
              this.torneos = torneos;
              for (let i in this.torneos){
                if (this.nroEquipos.length == 0){
                  this.torneos[i].nroEquipos = 0;
                  console.log('entro al if');
                }else{
                  console.log('entro al else');
                  for (let j in this.nroEquipos){
                     if (this.torneos[i].idTorneo == this.nroEquipos[j].idTorneo){
                       this.torneos[i].nroEquipos = this.nroEquipos[j].nroEquipos;
                       break;
                     }else{
                       this.torneos[i].nroEquipos = 0;
                     }
                  }
                }
              }
              this.buscarFiltro();
              if(this.torneos.length == 0){
                this.aviso = 1;
              }
            }
      )
  }

 /*  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    setTimeout(
      ()=>{
        if (val && val.trim() != '') {
          this.torneos = this.torneos.filter((item) => {
            return (item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
      },150
    );
    
  } */

  unirse( nroEquipos:any, maxEquipos:any, idTor:any) {

    var confirm;
    if(this.idRol == '4'){
      this.torneoProvider.setIdTorneo(idTor);
      this.torneoProvider.setIdVer(3);
      this.navCtrl.push(VerTorneoPage);
    }else{

      if( nroEquipos < maxEquipos  ){
        this.torneoProvider.setIdTorneo(idTor);
        this.torneoProvider.setIdVer(0);
        this.navCtrl.push(VerTorneoPage);
      }else{
  
          confirm = this.alertCtrl.create({
            title: 'Torneo Lleno!',
            subTitle: 'Lo sentimos el torneo se encuentra lleno',
            buttons: ['Aceptar']
          });
          
          confirm.present();
      }
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TorneosPage');
  }

}
