import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntrenamientoMenuPage } from './entrenamiento-menu';

@NgModule({
  declarations: [
    EntrenamientoMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(EntrenamientoMenuPage),
  ],
})
export class EntrenamientoMenuPageModule {}
