import { EquipoProvider } from './../../providers/equipo/equipo';
import { ParticipantesTorneoPage } from './../participantes-torneo/participantes-torneo';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EditarTorneoPage } from './../editar-torneo/editar-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EquiposInscritosPage } from '../equipos-inscritos/equipos-inscritos';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
              private usuarioProvider: UsuarioProvider,
              private equipoProvider: EquipoProvider,
              public alertCtrl: AlertController) {
                this.form = this.fb.group({
                  idDeporte: new FormControl(0),
                  genero: new FormControl(3),
                  tipo: new FormControl(2)
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
          this.buscarFiltro();
          if(this.torneos.length == 0){
            this.aviso = 1;
          }
        },
        e=>{
          console.log(e);
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
    this.aviso = 0;
    this.getTorneos();
    
    /* this.aviso = 0;
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
    } */
  }

  showAlert(idTorneo:any, i:any, nombre:any, individual:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este torneo!',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(idTorneo,i, nombre, individual)
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


  verInscritos(idTorneo){
    this.torneoService.setIdTorneo(idTorneo);
    this.navCtrl.push(ParticipantesTorneoPage);
  }

  eliminar(idTorneo:any,i:any, nombre:any, individual:any){
    console.log('entro');
    
    if(individual == 1){
      this.torneoService.setIdTorneo(idTorneo);
      this.torneoService.getEquiposEnTorneo()
      .subscribe(
        res=>{
          let participantes = res.result;
          console.log(this.participantes);
          for(let i in participantes){
            this.equipoProvider.getIntegrantes(participantes[i].idEquipo)
           .subscribe(
            res=>{
                let integrantes = res.result;
                console.log(integrantes);

                for(let i in integrantes){
                  let data = {
                    tipo: 1,
                    descripcion: `Se elimino el torneo por equipos: ${nombre}`,
                    idEquipo: 0,
                    idSalida: 0,
                    idUsuario: integrantes[i].idUsuario
                  }
                  this.usuarioProvider.addNotificacion(data)
                    .subscribe(
                      res=>{
                        console.log(res);
                      },
                      e=>{
                        console.log(e);
                      }
                    )
                }
              
            },
            e=>{
              console.log(e);
            });

          }
        },
          e=>{
            console.log(e);
          }
      )
    }else{
      this.torneoService.getTorneoI_Participantes()
      .subscribe(
        res=>{
          let integrantes = res.result;
          console.log(integrantes);
          for(let i in integrantes){
            let data = {
              tipo: 1,
              descripcion: `Se elimino el torneo individual: ${nombre}`,
              idEquipo: 0,
              idSalida: 0,
              idUsuario: integrantes[i].idUsuario
            }
            this.usuarioProvider.addNotificacion(data)
              .subscribe(
                res=>{
                  console.log(res);
                },
                e=>{
                  console.log(e);
                }
              )
          }
        },
        e=>{
          console.log(e);
        }
      )
    }


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

}
