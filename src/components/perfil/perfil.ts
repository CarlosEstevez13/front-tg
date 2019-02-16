import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';

/**
 * Generated class for the PerfilComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'perfil',
  templateUrl: 'perfil.html'
})
export class PerfilComponent {

  text: string;
  id:any;
  usuario:any;

  constructor(public _usuarioProvider: UsuarioProvider) {
    console.log('Hello PerfilComponent Component');
    this.text = 'Hello World';
    this.id = sessionStorage.getItem('idUsuario');
    this.usuario = _usuarioProvider.getUsuario(this.id);
    console.log(this.usuario);
  }


}
