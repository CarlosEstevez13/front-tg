import { EditarPerfilPage } from './../editar-perfil/editar-perfil';
import { PerfilPage } from './../perfil/perfil';
import { EquipoProvider } from './../../providers/equipo/equipo';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-gestionar-usuario',
  templateUrl: 'gestionar-usuario.html',
})
export class GestionarUsuarioPage {

  aviso = 0;
  form: FormGroup;
  usuarios:any = [];
  roles:any = [];

  constructor(public navCtrl: NavController, 
              private equipoProvider: EquipoProvider,
              private usuarioProvider: UsuarioProvider,
              private fb: FormBuilder,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
                this.form = this.fb.group({
                  idRol: new FormControl(0)
                });
  }

  ionViewWillEnter(){
    this.usuarioProvider.getRoles()
      .subscribe(
        res=>{
          this.roles = res.result;
        },
        e=>{
          console.log(e);
        }
      )
    this.getUsuarios();
  }
  editar(idUsuario){
    this.navCtrl.push(EditarPerfilPage);
    this.equipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
  }

  getUsuarios(){
    this.usuarioProvider.getUsuarios()
      .subscribe(
        res=>{
          this.usuarios = res.result;
          if(this.usuarios.length == 0){
            this.aviso =1;
          }
        },
        e=>{
          this.aviso =1;
          console.log(e);
        }
      )
  }

  /* buscarFiltro(){
    if(this.form.value.idRol != 0){
      let usuarioBusqueda = [];
      for(let i in this.usuarios){
        if(this.usuarios[i].idRol==this.form.value.idRol){
          usuarioBusqueda.push(this.usuarios[i]);
          console.log('entro');
        }
      }
      this.usuarios = usuarioBusqueda;
    }
  } */

  buscar(){
    this.aviso = 0;
    this.getUsuariosRoles();
   
  }

  getUsuariosRoles(){
    if(this.form.value.idRol != 0 ){
      console.log(this.form.value.idRol);
      this.usuarioProvider.getUsuariosR(this.form.value.idRol)
        .subscribe(
          res=>{
            this.usuarios = res.result;
            if(this.usuarios.length == 0){
              this.aviso =1;
            }
          },
          e=>{
            this.aviso =1;
            console.log(e);
          }
        )
    }else{
      this.getUsuarios();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GestionarUsuarioPage');
  }

  showAlert(id:any, i:any) {
    const alert = this.alertCtrl.create({
      title: 'Eliminar!',
      subTitle: 'Estas seguro de borrar este usuario!',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.eliminar(id,i)
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

  eliminar(id:any,i:any){
    console.log('entro');
    
    this.usuarioProvider.deleteUsuario(id)
      .subscribe(
        res=>{
          console.log(res);
          this.usuarios.splice(i,1);
        },
        e=>{
          console.log(e);
        }
      );    
  }

  verUsuario(idUsuario){
    this.equipoProvider.setIdUsuario(sessionStorage.getItem('idUsuario'));
    sessionStorage.setItem('idUsuario',idUsuario);
    sessionStorage.setItem('temp0','1');
    this.navCtrl.push(PerfilPage);
  }
}
