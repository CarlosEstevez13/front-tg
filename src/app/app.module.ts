import { SalidasIMenuPage } from './../pages/salidas-i-menu/salidas-i-menu';
import { SalidasEMenuPage } from './../pages/salidas-e-menu/salidas-e-menu';
import { TorneosMenuPage } from './../pages/torneos-menu/torneos-menu';
import { EditarEquipoPage } from './../pages/editar-equipo/editar-equipo';
import { EquipoPage } from './../pages/equipo/equipo';
import { HttpClientModule } from '@angular/common/http';
import { SalidasIPage } from './../pages/salidas-i/salidas-i';
import { TorneosPage } from './../pages/torneos/torneos';
import { CrearEventoPage } from './../pages/crear-evento/crear-evento';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventosPage } from '../pages/eventos/eventos';
import { SalidasEPage } from '../pages/salidas-e/salidas-e';
import { TorneosProvider } from '../providers/torneos/torneos';
import { HttpModule } from '@angular/http';
import { EquipoProvider } from '../providers/equipo/equipo';
import { AgregarIntegrantePage } from '../pages/agregar-integrante/agregar-integrante';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EventosPage,
    CrearEventoPage,
    TorneosPage,
    SalidasIPage,
    SalidasEPage,
    EquipoPage,
    EditarEquipoPage,
    AgregarIntegrantePage,
    TorneosMenuPage,
    SalidasEMenuPage,
    SalidasIMenuPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    /* IonicModule.forRoot(MyApp), */
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:false
   })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    EventosPage,
    CrearEventoPage,
    TorneosPage,
    SalidasIPage,
    SalidasEPage,
    EquipoPage,
    EditarEquipoPage,
    AgregarIntegrantePage,
    TorneosMenuPage,
    SalidasEMenuPage,
    SalidasIMenuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TorneosProvider,
    EquipoProvider
  ]
})
export class AppModule {}
