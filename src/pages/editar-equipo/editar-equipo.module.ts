import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarEquipoPage } from './editar-equipo';

@NgModule({
  declarations: [
    EditarEquipoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarEquipoPage),
  ],
})
export class EditarEquipoPageModule {}
