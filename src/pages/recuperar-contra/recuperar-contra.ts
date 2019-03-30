import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the RecuperarContraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recuperar-contra',
  templateUrl: 'recuperar-contra.html',
})
export class RecuperarContraPage {
  form: FormGroup;
  email:any;
  pass:any;
  paso1=0;
  error=0;
  err=0;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               private fb: FormBuilder,
               public alertCtrl: AlertController,
               public _usuarioProvider : UsuarioProvider) {
                this.form = this.fb.group({
                  email: new FormControl(),
                  pass:new FormControl()
                });
  }

  recuperar(){
    
    this._usuarioProvider.recuperar(this.email)
      .subscribe(
        res=>{
          console.log(res);
          this.paso1=1;
        },
        e=>{
          console.log(e);
          this.err=1;
        }
      ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecuperarContraPage');
    
  }

  validar(){
    this._usuarioProvider.validar(this.form.value)
      .subscribe(
        res=>{
          console.log(res.result);
          if(res.result.length==0){
            this.error=1;
          }
          else{
          this.paso1=2;
          console.log(this.paso1)
          this.validacion();
          }
        },
        e=>{
          console.log(e);
        }
      );
  }

  cambiar(){
    this._usuarioProvider.cambiarPass(this.form.value)
    .subscribe(
      res=>{
        console.log(res);
        this.volver();
      },
      e=>{
        console.log(e);
        this.error=2;
      }
    );
  }

  validacion() {
    const alert = this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Validacion completa, procesa a cambiar la contraseña',
      buttons: [{
        text: 'Si',
        handler: () => {
          this.form.setValue({
            email: '',
            pass: ''
          });
          
        }
      }
    ]
      
    });
    alert.present();
  }

  volver(){
    const alert = this.alertCtrl.create({
      title: 'Exito',
      subTitle: 'Contraseña actualizada',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.pop();
        }
      }
    ]
      
    });
    alert.present();
  }
}
