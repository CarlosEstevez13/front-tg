import { HistorialPageModule } from './../pages/historial/historial.module';
import { MisSalidasEPageModule } from './../pages/mis-salidas-e/mis-salidas-e.module';
import { MisSalidasEPage } from './../pages/mis-salidas-e/mis-salidas-e';
import { VerTorneoPage } from './../pages/ver-torneo/ver-torneo';
import { EditarTorneoPage } from './../pages/editar-torneo/editar-torneo';
import { MisTorneosPageModule } from './../pages/mis-torneos/mis-torneos.module';
import { AgregarIntegrantePageModule } from './../pages/agregar-integrante/agregar-integrante.module';
import { TorneosMenuPageModule } from './../pages/torneos-menu/torneos-menu.module';
import { TorneosPageModule } from './../pages/torneos/torneos.module';
import { SalidasIMenuPageModule } from './../pages/salidas-i-menu/salidas-i-menu.module';
import { SalidasEMenuPageModule } from './../pages/salidas-e-menu/salidas-e-menu.module';
import { SalidasIPageModule } from './../pages/salidas-i/salidas-i.module';
import { SalidasEPageModule } from './../pages/salidas-e/salidas-e.module';
import { RegistroPageModule } from './../pages/registro/registro.module';
import { PerfilPageModule } from './../pages/perfil/perfil.module';
import { LoginPageModule } from './../pages/login/login.module';
import { InscritoTorneoPageModule } from './../pages/inscrito-torneo/inscrito-torneo.module';
import { InscritoSalidaIPageModule } from './../pages/inscrito-salida-i/inscrito-salida-i.module';
import { InscritoSalidaEPageModule } from './../pages/inscrito-salida-e/inscrito-salida-e.module';
import { EventosPageModule } from './../pages/eventos/eventos.module';
import { EquipoPageModule } from './../pages/equipo/equipo.module';
import { EditarEquipoPageModule } from './../pages/editar-equipo/editar-equipo.module';
import { CrearTorneoPageModule } from './../pages/crear-torneo/crear-torneo.module';
import { CrearSalidaIPageModule } from './../pages/crear-salida-i/crear-salida-i.module';
import { CrearSalidaEPageModule } from './../pages/crear-salida-e/crear-salida-e.module';
import { CrearEventoPageModule } from './../pages/crear-evento/crear-evento.module';
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
import { RegistroPage } from '../pages/registro/registro';
import { PerfilPage } from '../pages/perfil/perfil';
import { HistorialPage } from "../pages/historial/historial";
import { HistorialProvider } from '../providers/historial/historial';
import { MisTorneosPage } from '../pages/mis-torneos/mis-torneos';
import { EditarTorneoPageModule } from '../pages/editar-torneo/editar-torneo.module';
import { EquiposInscritosPage } from '../pages/equipos-inscritos/equipos-inscritos';
import { EquiposInscritosPageModule } from '../pages/equipos-inscritos/equipos-inscritos.module';
import { VerTorneoPageModule } from '../pages/ver-torneo/ver-torneo.module';
import { SalidaEProvider } from '../providers/salida-e/salida-e';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
    /* EventosPage,
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
    RegistroPage,
    PerfilComponent,
    PerfilPage */

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HistorialPageModule,
    AgregarIntegrantePageModule,
    CrearEventoPageModule,
    CrearSalidaEPageModule,
    CrearSalidaIPageModule,
    CrearTorneoPageModule,
    EditarEquipoPageModule,
    EquipoPageModule,
    EventosPageModule,
    InscritoSalidaEPageModule,
    InscritoSalidaIPageModule,
    InscritoTorneoPageModule,
    LoginPageModule,
    PerfilPageModule,
    RegistroPageModule,
    SalidasEPageModule,
    SalidasIPageModule,
    SalidasEMenuPageModule,
    SalidasIMenuPageModule,
    TorneosPageModule,
    TorneosMenuPageModule,
    MisTorneosPageModule,
    EditarTorneoPageModule,
    EquiposInscritosPageModule,
    VerTorneoPageModule,
    MisSalidasEPageModule,
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
    PerfilPage,
    HistorialPage,
    RegistroPage,
    MisTorneosPage,
    EditarTorneoPage,
    EquiposInscritosPage,
    VerTorneoPage,
    MisSalidasEPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TorneosProvider,
    EquipoProvider,
    UsuarioProvider,
    LoginProvider,
    HistorialProvider,
    SalidaEProvider
  ]
})
export class AppModule {}
