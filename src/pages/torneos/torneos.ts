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
  equipo:any;
  torneosInscritos:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public torneoProvider: TorneosProvider,
              public alertCtrl: AlertController) {
    this.idEquipo = sessionStorage.getItem('idEquipo');
    //this.getTorneosDeEquipo();
  }
  
  ionViewWillEnter() {
    console.log('ionViewDidLoad TorneosPage');
    this.getNroEquipos();
    this.initializeItems();
  }

  initializeItems() {
    console.log('entro a la funcion')
    this.torneoProvider.getTorneosDeporte(this.idDeporte)
        .subscribe(res=> {
          //this.torneos = res.result;
          console.log(res.result);
          this.getTorneosDeEquipo(res.result);
          
        },
        e=>{
          console.log('ocurrio un error');
        });
  }
  
 

  getNroEquipos(){
    this.torneoProvider.getNroEquiposTorneoDeporte(this.idDeporte)
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
            }
      )
  }

  getItems(ev: any) {
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
    
  }

  unirse( nroEquipos:any, maxEquipos:any, idTor:any) {

    var confirm;

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad TorneosPage');
  }

}
