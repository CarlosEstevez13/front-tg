import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantesTorneoPage } from './participantes-torneo';

@NgModule({
  declarations: [
    ParticipantesTorneoPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantesTorneoPage),
  ],
})
export class ParticipantesTorneoPageModule {}
