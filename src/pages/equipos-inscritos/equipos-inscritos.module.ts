import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EquiposInscritosPage } from './equipos-inscritos';

@NgModule({
  declarations: [
    EquiposInscritosPage,
  ],
  imports: [
    IonicPageModule.forChild(EquiposInscritosPage),
  ],
})
export class EquiposInscritosPageModule {}
