import { PatrocinadoresPage } from './../patrocinadores/patrocinadores';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { ParticipantesTorneosIPage } from './../participantes-torneos-i/participantes-torneos-i';
import { UbicacionPage } from './../ubicacion/ubicacion';
import { JuradoPage } from './../jurado/jurado';
import { ParticipantesTorneoPage } from './../participantes-torneo/participantes-torneo';
import { TorneosProvider } from './../../providers/torneos/torneos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-ver-torneo',
  templateUrl: 'ver-torneo.html',
})
export class VerTorneoPage {

  torneo:any = {
    nombre: '',
    descripcion: '',
    reglamento: '',
    maxEquipos: 0,
    fechaInicio: ''
  };
  idEquipo:any;

  idVer:any;

  solicitudEnviada:any =0;

  reglamento:any = 0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private iab : InAppBrowser,
              private usuarioProvider: UsuarioProvider,
              private torneoProvider: TorneosProvider) {
                this.idEquipo = sessionStorage.getItem('idEquipo');
                let idUsuario = sessionStorage.getItem('idUsuario');
                this.torneoProvider.getSolicitudEnviada(idUsuario)
                  .subscribe(
                    res=>{
                      if(res.result){
                        this.solicitudEnviada =1;
                      }
                    },
                    e=>{
                      console.log(e);
                    }
                  );
                this.torneoProvider.getTorneo()
                  .subscribe(
                    res=>{
                      console.log(res);
                      this.torneo = res.result[0];
                      sessionStorage.setItem('direccion',this.torneo.direccion);
                      if(this.torneo.reglamento != 'null'){
                        this.reglamento = 1;
                      }

                    },
                    e=>{
                      console.log(e);
                    }
                  );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerTorneoPage');
  }


  ionViewWillEnter(){
    this.idVer = this.torneoProvider.getIdVer();
  }

  ionViewWillLeave(){
    sessionStorage.removeItem('temp');
  }

  verJurado(idTorneo){
    this.torneoProvider.setIdTorneo(idTorneo);
    this.navCtrl.push(JuradoPage);
  }

  verPatrocinadores(idTorneo){
    this.torneoProvider.setIdTorneo(idTorneo);
    this.navCtrl.push(PatrocinadoresPage);
  }

  ubicacion(lat,lng){
    sessionStorage.setItem('tempLat',`${lat}`);
    sessionStorage.setItem('tempLng',`${lng}`);
    sessionStorage.setItem('ver',`1`);
    this.navCtrl.push(UbicacionPage);
  }

  verInscritos(){
    console.log('hola');
    this.navCtrl.push(ParticipantesTorneoPage);
  }

  verInscritos1(){
    console.log('hola');
    this.navCtrl.push(ParticipantesTorneosIPage);
  }

  salir(){
    this.navCtrl.pop();
  }
  
  verPdf(nombre){
    console.log('entro');
    const browser = this.iab.create( `http://10.14.14.219:3002/pdf/${nombre}.pdf`, '_system');
    console.log(browser);

  }
  arbitrar(){
    let data = {
      idTorneo : this.torneoProvider.getIdTorneo(),
      idUsuario : sessionStorage.getItem('idUsuario'),
      idRol : 3
    }
            
    this.torneoProvider.addJuez(data)
      .subscribe(
        res=>{
          console.log(res);
          this.usuarioProvider.putNotificacion(parseInt(sessionStorage.getItem('temp')))
          .subscribe(
            res=>{
              console.log(res);
                let data = {
                  tipo: 9,
                  descripcion: `El juez ${sessionStorage.getItem('nombreArbitro')} ha aceptado arbitrar el torneo ${this.torneo.nombre}`,
                  idEquipo: 0,
                  idSalida: 0,
                  idUsuario: this.torneo.idUsuario,
                  idRemitente: sessionStorage.getItem('idUsuario')
                }
                this.usuarioProvider.addNotificacion(data)
                  .subscribe(
                    res=>{
                      console.log(res);
                      this.navCtrl.pop();
                    },
                    e=>{
                      console.log(e);
                    }
                  )
              
            },
            e=>{
              console.log(e);
            }
          );
        },
        e=>{
          console.log(e);
        }
      )
  }

  patrocinar(){
    let data = {
      tipo: 6,
      descripcion: `A el patrocinador ${sessionStorage.getItem('nombreArbitro')} le gustaria patrocinar el torneo: ${this.torneo.nombre}`,
      idEquipo: sessionStorage.getItem('idUsuario'),
      idSalida: this.torneo.idTorneo,
      idUsuario: this.torneo.idUsuario,
      idRemitente: sessionStorage.getItem('idUsuario')
    }
    this.usuarioProvider.addNotificacion(data)
      .subscribe(
        res=>{
          console.log(res);
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      )
  }

  unirse(){
    let data = {
      idEquipo: this.idEquipo,
      idTorneo: this.torneo.idTorneo
    }
    this.torneoProvider.addEquipoTorneo(data)
      .subscribe(
        res=>{
          console.log('se unio');
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      )
  }

}
