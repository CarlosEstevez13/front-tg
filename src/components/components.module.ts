import { MapaComponent } from './mapa/mapa';
import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';

@NgModule({
	declarations: [MapaComponent,GoogleMapComponent],
	imports: [],
	exports: [MapaComponent,GoogleMapComponent]
})
export class ComponentsModule {}
