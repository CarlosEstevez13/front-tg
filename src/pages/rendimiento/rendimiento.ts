import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RendimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rendimiento',
  templateUrl: 'rendimiento.html',
})
export class RendimientoPage {

  form: FormGroup;
  usuario:any;
  edad:any;
  rendimiento =0;
  aviso =0;
  resultado=0;
  constructor(public navCtrl: NavController,
              public usuarioProvider: UsuarioProvider,
              private fb: FormBuilder,
              public navParams: NavParams) {
                this.form = this.fb.group({
                  minutos: new FormControl(null, Validators.required),
                  segundos: new FormControl(null, Validators.required),
                  ritmo: new FormControl(null, Validators.required)
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RendimientoPage');
  }

  calcularEdad(fecha:any) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    this.edad = edad;
    console.log(this.edad);
  }

  calcular(){
    console.log(this.usuario.genero);
    if(this.usuario.peso == 0 || this.usuario.estatura == 0){
      this.aviso =1;
    }else{

      if(this.usuario.genero == 0){
        this.rendimiento = 184.9 - 4.65*(parseInt(this.form.value.minutos) + (parseInt(this.form.value.segundos)/60))
                      -0.22*(this.form.value.ritmo) - 0.26*(this.edad)
                      -1.05*(this.usuario.peso/((this.usuario.estatura/100)*(this.usuario.estatura/100)));
      }
      if(this.usuario.genero == 1){
        console.log('entro');
        this.rendimiento = 116.2 - 2.98*((parseInt(this.form.value.minutos) + (parseInt(this.form.value.segundos)/60)))
                      -0.11*(this.form.value.ritmo) - 0.14*(this.edad)
                      -0.39*(this.usuario.peso/((this.usuario.estatura/100)*(this.usuario.estatura/100)));
      }
      this.aviso =0;
      console.log(this.rendimiento);
      this.resultado =1;
    }
  }

  guardar(){
    let hoy = new Date()
    let data = {
      valor : this.rendimiento,
      idUsuario: sessionStorage.getItem('idUsuario'),
      fecha: `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDate()}`
    };
    this.usuarioProvider.addRendimiento(data)
      .subscribe(
        res=>{
          console.log(res);
          this.navCtrl.pop();
        },
        e=>{
          console.log(e);
        }
      );
  }

  ionViewWillLoad(){
    this.usuarioProvider.getUsuario(sessionStorage.getItem('idUsuario'))
      .subscribe(
        res=>{
          this.usuario = res.result[0];
          console.log(this.usuario);
          this.calcularEdad(this.usuario.fechaNacimiento);
        },
        e=>{
          console.log(e);
        }
      );
  }

}
