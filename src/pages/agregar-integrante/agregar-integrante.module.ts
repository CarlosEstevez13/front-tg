import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarIntegrantePage } from './agregar-integrante';

@NgModule({
  declarations: [
    AgregarIntegrantePage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarIntegrantePage),
  ],
})
export class AgregarIntegrantePageModule {}
