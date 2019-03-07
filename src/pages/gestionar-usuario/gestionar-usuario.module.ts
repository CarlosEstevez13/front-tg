import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarUsuarioPage } from './gestionar-usuario';

@NgModule({
  declarations: [
    GestionarUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarUsuarioPage),
  ],
})
export class GestionarUsuarioPageModule {}
