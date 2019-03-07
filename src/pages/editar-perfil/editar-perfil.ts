import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {


  form: FormGroup;
  id:any;
  idUsuario:any = sessionStorage.getItem('idUsuario');

  contra:boolean = false;
  selectedFile: File = null;

  public usuario: any = {
    
    };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _usuarioProvider: UsuarioProvider,
              private http: HttpClient,
              private fb: FormBuilder) {

                this.crearFormu();
                this.id = sessionStorage.getItem('idUsuario');
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
  }

  ionViewWillEnter(){
    console.log('entro');
    this._usuarioProvider.getUsuario(this.id).subscribe(res=> {
        
      console.log(res.result[0]);
      this.usuario = res.result[0];
      console.log(this.usuario);
      
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
        genero:this.usuario.genero,
        imagen:this.usuario.imagen
        
      });

  },
  e=>{
    console.log(e);

  });
  }

  editarUsuario(){
    if(!this.contra){
      this.form.controls['pass2'].setValue(this.form.controls['pass'].value);
      }
    this.agregarFoto();
    this._usuarioProvider.putUsuario(this.id,this.form.value).subscribe(
      res=>{
        console.log('respuesta');
        this.navCtrl.pop();
      },
      e=>{
        console.log(e);
      }
    );
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
      genero: new FormControl(),
      imagen: new FormControl()
    });
   

  }

  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  agregarFoto(){
    const fd  = new FormData();
    fd.append('image', this.selectedFile, `${this.idUsuario}`);
    this.http.post('http://192.68.1.6:3002/api/upload', fd)
      .subscribe(
        res=>{
          console.log(res)
        },
        e=>{
          console.log(e)
        }
      )
  }

}
