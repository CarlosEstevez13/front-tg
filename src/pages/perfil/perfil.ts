import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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

  text: string;
  id:any;
  edad:any;
  form: FormGroup;
  edit:boolean = false;
  contra:boolean = false;

  public usuario: any = {
    
    };

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public _usuarioProvider: UsuarioProvider,
      private fb: FormBuilder, ) {

      this.crearFormu();
      this.id = sessionStorage.getItem('idUsuario');
      _usuarioProvider.getUsuario(this.id).subscribe(res=> {
        
        console.log(res.result[0]);
        this.usuario = res.result[0];
        console.log(this.usuario);
        this.edad = this.calcularEdad(this.usuario.fechaNacimiento);
        
        this.form.setValue({
          nombre: this.usuario.nombre,
          estatura: this.usuario.estatura,
          peso: this.usuario.peso,
          fechaNacimiento: this.usuario.fechaNacimiento,
          telefono: this.usuario.telefono,          
          email: this.usuario.email,
          descripcion: this.usuario.descripcion,
          fechaRegistro: this.usuario.fechaRegistro,
          pass: '',
          pass2: '',
          genero:'1'
          
        });

    },
    e=>{
      console.log(e);

    });
    
  
  

  }

  crearFormu(){
    this.form = this.fb.group({
      nombre: new FormControl(),
      estatura: new FormControl(),
      peso: new FormControl(),
      fechaNacimiento: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
      descripcion: new FormControl(),
      fechaRegistro: new FormControl(),
      pass: new FormControl(),
      pass2: new FormControl(),
      genero: new FormControl()
    });
   

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

editarUsuario(){
  if(!this.contra){
    this.form.controls['pass2'].setValue(this.form.controls['pass'].value);
    }
  this._usuarioProvider.putUsuario(this.id,this.form.value).subscribe(
    res=>{
      console.log(res);
    },
    e=>{
      console.log(e);
    }
  );
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
  }



}
