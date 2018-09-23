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


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public torneoProvider: TorneosProvider,
              public alertCtrl: AlertController) {
    this.getNroEquipos();
    this.initializeItems();
  }

  initializeItems() {
    console.log('entro a la funcion')
    this.torneoProvider.getTorneos()
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
    this.torneoProvider.getNroEquiposTorneo()
        .subscribe(res=> {
          this.nroEquipos = res.result;
          console.log(this.nroEquipos);
        },
        e=>{
          console.log('ocurrio un error');
        });
     
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

  unirse(nombre:any, nroEquipos:any, maxEquipos?:any) {
    var confirm;

    if( nroEquipos < maxEquipos){

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
          }
        }
      ]
    });
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
