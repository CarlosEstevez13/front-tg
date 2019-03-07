import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GestionarTorneosPage } from './gestionar-torneos';

@NgModule({
  declarations: [
    GestionarTorneosPage,
  ],
  imports: [
    IonicPageModule.forChild(GestionarTorneosPage),
  ],
})
export class GestionarTorneosPageModule {}
