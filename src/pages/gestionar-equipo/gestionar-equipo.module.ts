import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarEquipoPage } from './gestionar-equipo';

@NgModule({
  declarations: [
    GestionarEquipoPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarEquipoPage),
  ],
})
export class GestionarEquipoPageModule {}
