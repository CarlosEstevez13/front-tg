import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearEntrenamientoPage } from './crear-entrenamiento';

@NgModule({
  declarations: [
    CrearEntrenamientoPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearEntrenamientoPage),
  ],
})
export class CrearEntrenamientoPageModule {}
