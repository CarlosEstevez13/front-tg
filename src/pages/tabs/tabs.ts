import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { EventosPage } from './../eventos/eventos';
import { EquipoPage } from '../equipo/equipo';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = EquipoPage;
  tab3Root = EventosPage;

  constructor() {

  }

  ionViewWillEnter(){
    console.log('entro a tabs');
  }
}
