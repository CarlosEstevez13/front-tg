import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InscritoTorneoPage } from './inscrito-torneo';

@NgModule({
  declarations: [
    InscritoTorneoPage,
  ],
  imports: [
    IonicPageModule.forChild(InscritoTorneoPage),
  ],
})
export class InscritoTorneoPageModule {}
