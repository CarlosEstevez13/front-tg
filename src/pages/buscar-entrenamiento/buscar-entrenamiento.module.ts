import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarEntrenamientoPage } from './buscar-entrenamiento';

@NgModule({
  declarations: [
    BuscarEntrenamientoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarEntrenamientoPage),
  ],
})
export class BuscarEntrenamientoPageModule {}
