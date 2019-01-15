import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TorneosMenuPage } from './torneos-menu';

@NgModule({
  declarations: [
    TorneosMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(TorneosMenuPage),
  ],
})
export class TorneosMenuPageModule {}
