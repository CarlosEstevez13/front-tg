import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarTorneoPage } from './editar-torneo';

@NgModule({
  declarations: [
    EditarTorneoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarTorneoPage),
  ],
})
export class EditarTorneoPageModule {}
