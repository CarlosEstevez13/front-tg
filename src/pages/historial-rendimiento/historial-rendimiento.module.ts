import { ChartsModule } from 'ng2-charts-x';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorialRendimientoPage } from './historial-rendimiento';

@NgModule({
  declarations: [
    HistorialRendimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorialRendimientoPage),
    ChartsModule
  ],
})
export class HistorialRendimientoPageModule {}
