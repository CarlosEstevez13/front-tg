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
    this.usuarioProvider.getUsuarios()
      .subscribe(
        res=>{
          this.usuarios = res.result;
        },
        e=>{
          this.aviso =1;
          console.log(e);
        }
      )
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
