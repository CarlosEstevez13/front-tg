import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  form: FormGroup;

  campos:any = {
    idUsuario:null,
    nombre:null,
    estatura:0,
    peso:0,
    password: null,
    password2: null,
    fechaNacimiento: null,
    telefono: null,
    email: null,
    descripcion:null,
    fechaRegistro:null,
    genero:0,
    roles:1
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private _loginService: LoginProvider) {
                this.form = this.fb.group({
                  idUsuario: new FormControl(this.campos.idUsuario),
                  estatura: new FormControl(this.campos.estatura),
                  peso: new FormControl(this.campos.peso),
                  nombre: new FormControl(this.campos.nombre),
                  password: new FormControl(this.campos.password),
                  password2: new FormControl(this.campos.password2),
                  fechaNacimiento: new FormControl(this.campos.fechaNacimiento),
                  telefono: new FormControl(this.campos.telefono),
                  email: new FormControl(this.campos.email),
                  descripcion: new FormControl(this.campos.descripcion),
                  fechaRegistro: new FormControl(this.campos.fechaRegistro),
                  genero: new FormControl(this.campos.genero),
                  roles: new FormControl(this.campos.roles) 
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registro(){

    this._loginService.registro(this.form.value)
    .subscribe(
      res=>{
        console.log(res);
      },
      e=>{
        console.log(e);
      }
    );


    console.log(this.form.value);
    for(let i in this.form.value.roles){
      console.log(this.form.value.idUsuario);
      console.log(this.form.value.roles[i]);
      this._loginService.registroRol(this.form.value.idUsuario, this.form.value.roles[i])
    .subscribe(
      res=>{
        console.log(res);
      },
      e=>{
        console.log(e);
      }
    );
    }
    
  }

}
