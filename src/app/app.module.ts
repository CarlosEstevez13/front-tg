import { VideosEntretenimientoPageModule } from './../pages/videos-entretenimiento/videos-entretenimiento.module';

import { EntretenimientoPageModule } from '../pages/entretenimiento/entretenimiento.module';
import { GestionarTorneosPageModule } from './../pages/gestionar-torneos/gestionar-torneos.module';
import { GestionarUsuarioPage } from './../pages/gestionar-usuario/gestionar-usuario';
import { AdminPageModule } from './../pages/admin/admin.module';
import { UbicacionPageModule } from './../pages/ubicacion/ubicacion.module';
import { GoogleMapComponent } from './../components/google-map/google-map';
import { JuradoPageModule } from './../pages/jurado/jurado.module';

import { MisEntrenamientosPageModule } from '../pages/mis-entrenamientos/mis-entrenamientos.module';
import { CrearEntrenamientoPageModule } from '../pages/crear-entrenamiento/crear-entrenamiento.module';
import { VerEntrenamientoPageModule } from '../pages/ver-entrenamiento/ver-entrenamiento.module';
import { BuscarEntrenamientoPageModule } from '../pages/buscar-entrenamiento/buscar-entrenamiento.module';
import { EntrenamientoMenuPageModule } from '../pages/entrenamiento-menu/entrenamiento-menu.module';
import { EditarSalidasIPageModule } from '../pages/editar-salidas-i/editar-salidas-i.module';
import { MisSalidasIPageModule } from '../pages/mis-salidas-i/mis-salidas-i.module';
import { VerSalidaIPageModule } from '../pages/ver-salida-i/ver-salida-i.module';
import { ParticipantesTorneoPageModule } from './../pages/participantes-torneo/participantes-torneo.module';
import { CrearEquipoPageModule } from './../pages/crear-equipo/crear-equipo.module';
import { CrearEquipoPage } from './../pages/crear-equipo/crear-equipo';
import { IntegrantesPageModule } from './../pages/integrantes/integrantes.module';
import { EditarPerfilPage } from './../pages/editar-perfil/editar-perfil';
import { HistorialEquipoPage } from './../pages/historial-equipo/historial-equipo';
import { VerEquipoPageModule } from './../pages/ver-equipo/ver-equipo.module';
import { VerEquipoPage } from './../pages/ver-equipo/ver-equipo';
import { MarcadorSalidaEPageModule } from './../pages/marcador-salida-e/marcador-salida-e.module';
import { VerSalidaEPageModule } from './../pages/ver-salida-e/ver-salida-e.module';
import { VerSalidaEPage } from './../pages/ver-salida-e/ver-salida-e';
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
import { EditarSalidaEPage } from '../pages/editar-salida-e/editar-salida-e';
import { EditarSalidaEPageModule } from '../pages/editar-salida-e/editar-salida-e.module';
import { SalidaIProvider } from '../providers/salida-i/salida-i';
import { VerSalidaIPage } from '../pages/ver-salida-i/ver-salida-i';
import { MisSalidasIPage } from '../pages/mis-salidas-i/mis-salidas-i';
import { EditarSalidasIPage } from '../pages/editar-salidas-i/editar-salidas-i';
import { MarcadorSalidaEPage } from '../pages/marcador-salida-e/marcador-salida-e';
import { HistorialEquipoPageModule } from '../pages/historial-equipo/historial-equipo.module';
import { EditarPerfilPageModule } from '../pages/editar-perfil/editar-perfil.module';
import { IntegrantesPage } from '../pages/integrantes/integrantes';
import { ParticipantesTorneoPage } from '../pages/participantes-torneo/participantes-torneo';
import { EntrenamientoMenuPage } from '../pages/entrenamiento-menu/entrenamiento-menu';
import { BuscarEntrenamientoPage } from '../pages/buscar-entrenamiento/buscar-entrenamiento';
import { VerEntrenamientoPage } from '../pages/ver-entrenamiento/ver-entrenamiento';
import { CrearEntrenamientoPage } from '../pages/crear-entrenamiento/crear-entrenamiento';
import { MisEntrenamientosPage } from '../pages/mis-entrenamientos/mis-entrenamientos';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { JuradoPage } from '../pages/jurado/jurado';
import { MapaProvider } from '../providers/mapa/mapa';
import { UbicacionPage } from '../pages/ubicacion/ubicacion';
import { AdminPage } from '../pages/admin/admin';
import { GestionarEquipoPageModule } from '../pages/gestionar-equipo/gestionar-equipo.module';
import { GestionarUsuarioPageModule } from '../pages/gestionar-usuario/gestionar-usuario.module';
import { GestionarEquipoPage } from '../pages/gestionar-equipo/gestionar-equipo';
import { GestionarSalidasIPageModule } from '../pages/gestionar-salidas-i/gestionar-salidas-i.module';
import { GestionarSalidasEPageModule } from '../pages/gestionar-salidas-e/gestionar-salidas-e.module';
import { GestionarSalidasEPage } from '../pages/gestionar-salidas-e/gestionar-salidas-e';
import { GestionarSalidasIPage } from '../pages/gestionar-salidas-i/gestionar-salidas-i';
import { GestionarTorneosPage } from '../pages/gestionar-torneos/gestionar-torneos';
import { EntretenimientoPage } from '../pages/entretenimiento/entretenimiento';
import { VideosEntretenimientoPage } from './../pages/videos-entretenimiento/videos-entretenimiento';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    GoogleMapComponent
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
    VerSalidaEPageModule,
    VerSalidaIPageModule,
    EditarSalidaEPageModule,
    MisSalidasIPageModule,
    EditarSalidasIPageModule,
    MarcadorSalidaEPageModule,
    VerEquipoPageModule,
    HistorialEquipoPageModule,
    EditarPerfilPageModule,
    IntegrantesPageModule,
    CrearEquipoPageModule,
    ParticipantesTorneoPageModule,
    EntrenamientoMenuPageModule,
    BuscarEntrenamientoPageModule,
    VerEntrenamientoPageModule,
    CrearEntrenamientoPageModule,
    MisEntrenamientosPageModule,
    JuradoPageModule,
    UbicacionPageModule,
    AdminPageModule,
    GestionarUsuarioPageModule,
    GestionarEquipoPageModule,
    GestionarSalidasIPageModule,
    GestionarSalidasEPageModule,
    GestionarTorneosPageModule,
    EntretenimientoPageModule,
    VideosEntretenimientoPageModule,
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
    MisSalidasEPage,
    VerSalidaEPage,
    EditarSalidaEPage,
    VerSalidaIPage,
    MisSalidasIPage,
    EditarSalidasIPage,
    MarcadorSalidaEPage,
    VerEquipoPage,
    HistorialEquipoPage,
    EditarPerfilPage,
    IntegrantesPage,
    CrearEquipoPage,
    ParticipantesTorneoPage,
    EntrenamientoMenuPage,
    BuscarEntrenamientoPage,
    VerEntrenamientoPage,
    CrearEntrenamientoPage,
    MisEntrenamientosPage,
    JuradoPage,
    UbicacionPage,
    AdminPage,
    GestionarUsuarioPage,
    GestionarEquipoPage,
    GestionarSalidasEPage,
    GestionarSalidasIPage,
    GestionarTorneosPage,
    EntretenimientoPage,
    VideosEntretenimientoPage
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
    SalidaEProvider,
    InAppBrowser,
    MapaProvider,
    SalidaIProvider
  ]
})
export class AppModule {}
