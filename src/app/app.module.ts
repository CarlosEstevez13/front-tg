import { InscritoTorneoPage } from './../pages/inscrito-torneo/inscrito-torneo';
import { InscritoSalidaEPage } from './../pages/inscrito-salida-e/inscrito-salida-e';
import { CrearSalidaIPage } from './../pages/crear-salida-i/crear-salida-i';
import { CrearSalidaEPage } from './../pages/crear-salida-e/crear-salida-e';
import { CrearTorneoPage } from './../pages/crear-torneo/crear-torneo';
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
import { UsuarioProvider } from '../providers/usuario/usuario';
import { InscritoSalidaIPage } from '../pages/inscrito-salida-i/inscrito-salida-i';
import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../providers/login/login';
import { PerfilComponent } from '../components/perfil/perfil';
import { PerfilPage } from '../pages/perfil/perfil';

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
    SalidasIMenuPage,
    CrearTorneoPage,
    CrearSalidaEPage,
    CrearSalidaIPage,
    InscritoSalidaEPage,
    InscritoTorneoPage,
    InscritoSalidaIPage,
    LoginPage,
    PerfilComponent,
    PerfilPage

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
    SalidasIMenuPage,
    CrearTorneoPage,
    CrearSalidaEPage,
    CrearSalidaIPage,
    InscritoSalidaEPage,
    InscritoTorneoPage,
    InscritoSalidaIPage,
    LoginPage,
    PerfilPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TorneosProvider,
    EquipoProvider,
    UsuarioProvider,
    LoginProvider
  ]
})
export class AppModule {}
