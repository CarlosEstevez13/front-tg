import { TabsPage } from './../tabs/tabs';
import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
    pass: null,
    pass2: null,
    fechaNacimiento: null,
    telefono: null,
    email: null,
    descripcion:null,
    fechaRegistro:null,
    genero:0,
    roles:[1]
  };

  Deportes:any;

  dataUsuario:any;

  temp:any = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private fb: FormBuilder,
              private _loginService: LoginProvider) {
                this.form = this.fb.group({
                  estatura: new FormControl(this.campos.estatura),
                  peso: new FormControl(this.campos.peso),
                  nombre: new FormControl(this.campos.nombre),
                  pass: new FormControl(this.campos.pass),
                  pass2: new FormControl(this.campos.pass2),
                  fechaNacimiento: new FormControl(this.campos.fechaNacimiento),
                  telefono: new FormControl(this.campos.telefono),
                  email: new FormControl(this.campos.email),
                  descripcion: new FormControl(this.campos.descripcion),
                  fechaRegistro: new FormControl(this.campos.fechaRegistro),
                  genero: new FormControl(this.campos.genero),
                  roles: new FormControl(this.campos.roles) 
                });
              this._loginService.getDeportes()
              .subscribe(
                res=>{
                  this.Deportes = res.result;
                },
                e=>{
                  console.log(e);
                }
              )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');
  }

  registro(){

    console.log(this.form.value);

    this._loginService.registro(this.form.value)
    .subscribe(
      res=>{
        console.log(res);
        let id = res.result.idUsuario;
          for(let i in this.form.value.roles){
            console.log(this.form.value.roles[i]);
            this._loginService.registroRol(id, this.form.value.roles[i])
              .subscribe(
                res=>{
                  console.log(res);

                  let data = {
                    idUsuario: id,
                    idRol: this.form.value.roles[i],
                    idDeporte: this.Deportes[0].idDeporte,
                    activo:0
                  }
                  if(i=='0' ){
                      console.log(i);
                      data.activo = 1;
                      console.log('entro');
                      this.dataUsuario = {
                        idUsuario: id,
                        idDeporte: 1,
                        idRol: this.form.value.roles[0],
                        idEquipo: 'null'
                      };
                  }
                  
                  this._loginService.registroURD(data)
                    .subscribe(
                      res=>{
                        console.log(res);
                        sessionStorage.setItem('idUsuario',`${this.dataUsuario.idUsuario}`);
                        sessionStorage.setItem('idEquipo',`${this.dataUsuario.idEquipo}`);
                        sessionStorage.setItem('idRol',`${this.dataUsuario.idRol}`);
                        sessionStorage.setItem('idDeporte',`${this.dataUsuario.idDeporte}`);
                        this.temp =1;
                        
                      },
                      e=>{
                        console.log(e);
                      }
                    );
                },
                e=>{
                  console.log(e);
                }
              );
          }
      },
      e=>{
        console.log(e);
      }
    );
    setTimeout(
      ()=>{
        console.log(this.temp);
        if(this.temp ==1){
          this.navCtrl.setRoot(TabsPage);
        }

      },500
    
    );
    
  }

}
