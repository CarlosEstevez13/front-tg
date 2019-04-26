import { LoginPage } from './../login/login';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  @ViewChild("imagen") imagenElement;

  text: string;
  id:any;
  edad:any;
  edit:boolean = false;
  contra:boolean = false;
  rutaImagen = '';
  selectedFile: File = null;
  soloVer:any = 0;

  public usuario: any = {
    
    };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: HttpClient,
              private equipoService: EquipoProvider,
              public _usuarioProvider: UsuarioProvider ) {

      this.id = sessionStorage.getItem('idUsuario');

  }

  editar(){
    this.navCtrl.push(EditarPerfilPage);
  }

  ionViewWillLeave(){
    if(sessionStorage.getItem('temp0') == '1'){
      console.log('entro')
      sessionStorage.setItem('idUsuario',this.equipoService.getIdUsuario());
      sessionStorage.removeItem('temp0');
    }
    console.log('salio!')
  }


  calcularEdad(fecha:any) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }

  ionViewDidEnter(){
    
    this.soloVer =0;
    if(sessionStorage.getItem('temp0') == '1'){
      this.soloVer =1;
    }

    this._usuarioProvider.getUsuario(this.id).subscribe(
      res=> {
          this.usuario = res.result[0];
          console.log(this.usuario);
          this.edad = this.calcularEdad(this.usuario.fechaNacimiento);
          if(this.usuario.imagen != null){
            this.rutaImagen = `http://18.191.54.7/profile/${this.usuario.imagen}.png`;
            //this.rutaImagen = `http://18.191.54.7/profile/defecto.png`;
            console.log(this.rutaImagen);
          } else{
            this.rutaImagen = 'http://18.191.54.7/profile/defecto.png';
          }

      },
      e=>{
        console.log(e);

      });
  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.agregarFoto();
  }

  agregarFoto(){
    let aleatorio =Math.trunc(Math.random() * (10000));
    console.log(aleatorio);
    const fd  = new FormData();
    fd.append('image', this.selectedFile, `${aleatorio}-${this.id}`);
    this.http.post('http://18.191.54.7/api/upload', fd)
      .subscribe(
        res=>{
          console.log(res)
          let data = {
            imagen: `${aleatorio}-${this.id}`
          }
          this._usuarioProvider.putFotoUsuario(this.id,data)
            .subscribe(
              res=>{
                console.log(res);
                this.rutaImagen = `http://18.191.54.7/profile/${aleatorio}-${this.id}.png`;
              },
              e=>{
                console.log(e);
              }
            )
        },
        e=>{
          console.log(e)
        }
      )
  }

recargar(){
  this.navCtrl.resize();
}

logout(){
  sessionStorage.removeItem('idDeporte');
  sessionStorage.removeItem('idEquipo');
  sessionStorage.removeItem('idRol');
  sessionStorage.removeItem('idUsuario');
  this.navCtrl.setRoot(LoginPage);
}

}
