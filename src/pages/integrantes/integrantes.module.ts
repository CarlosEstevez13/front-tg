import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntegrantesPage } from './integrantes';

@NgModule({
  declarations: [
    IntegrantesPage,
  ],
  imports: [
    IonicPageModule.forChild(IntegrantesPage),
  ],
})
export class IntegrantesPageModule {}
