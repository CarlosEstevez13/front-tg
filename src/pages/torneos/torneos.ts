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

  idDeporte= 1;
  idEquipo:any;
  equipo:any;
  torneosInscritos:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public torneoProvider: TorneosProvider,
              public alertCtrl: AlertController) {
    this.idEquipo = sessionStorage.getItem('idEquipo');
    this.getNroEquipos();
    this.initializeItems();
    this.getTorneosDeEquipo();
  }

  initializeItems() {
    console.log('entro a la funcion')
    this.torneoProvider.getTorneosDeporte(this.idDeporte)
        .subscribe(res=> {
          this.torneos = res.result;

          for (let i in this.torneos){
            for (let j in this.nroEquipos){
               if (this.torneos[i].idTorneo == this.nroEquipos[j].idTorneo){
                 this.torneos[i].nroEquipos = this.nroEquipos[j].nroEquipos;
                 break;
               }else{
                 this.torneos[i].nroEquipos = 0;
               }
            }
          } 
          
          console.log(this.torneos);
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
        });
     
  }

  getTorneosDeEquipo(){
    
    this.torneoProvider.getTorneosDeEquipo(this.idEquipo)
      .subscribe(res=>{
        if (res.result){
          this.torneosInscritos = res.result;
        }else{
          this.torneosInscritos = [];
        }
        
        console.log(this.torneosInscritos);
      })
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

  unirse(nombre:any, nroEquipos:any, maxEquipos:any, idTor:any) {
    let inscrito =0;
    if(this.torneosInscritos != []){
      for(let i of this.torneosInscritos){
        if(i.idTorneo==idTor){
          inscrito =1;
        }
      }
    }

    var confirm;
    let equipo = {
                  idTorneo:idTor,
                  idEquipo: this.idEquipo,
                  parJugados:0,
                  parGanados:0,
                  parEmpatados:0,
                  parPerdidos:0,
                  posicion:0,
                  amarillas:0,
                  rojas:0
                 };

    if( nroEquipos < maxEquipos  ){
      if(inscrito ==0){
        confirm = this.alertCtrl.create({
          title: `${nombre}`,
          message: 'Te gustaria unirte a este torneo?',
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'Unirse',
              handler: () => {
                console.log('Agree clicked');
                this.torneoProvider.addEquipoTorneo(equipo)
                  .subscribe(
                    res=>{
                      console.log(res);
                    },
                    e=>{
                      console.log(e);
                    }
                    )
              }
            }
          ]
        }); 
      }if(inscrito ==1){
        confirm = this.alertCtrl.create({
          title: `${nombre}`,
          message: 'Ya te has unido a este torneo',
          buttons: [
            {
              text: 'Aceptar',
              handler: () => {
                console.log('Aceptar');
              }
            }
          ]
        }); 
      }
    }else{

        confirm = this.alertCtrl.create({
          title: 'Torneo Lleno!',
          subTitle: 'Lo sentimos el torneo se encuentra lleno',
          buttons: ['Aceptar']
        });
      
    }
    confirm.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TorneosPage');
  }

}
