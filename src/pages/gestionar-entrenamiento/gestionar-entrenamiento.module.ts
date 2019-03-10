import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarEntrenamientoPage } from './gestionar-entrenamiento';

@NgModule({
  declarations: [
    GestionarEntrenamientoPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarEntrenamientoPage),
  ],
})
export class GestionarEntrenamientoPageModule {}
