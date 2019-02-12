import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearTorneoPage } from './crear-torneo';

@NgModule({
  declarations: [
    CrearTorneoPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearTorneoPage),
  ],
})
export class CrearTorneoPageModule {}
