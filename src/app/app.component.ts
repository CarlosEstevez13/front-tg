import { AdminPage } from './../pages/admin/admin';
import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //rootPage:any = TabsPage;

  //rootPage:any = LoginPage;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    if (sessionStorage.getItem('idRol') ){
      if(sessionStorage.getItem('idRol') != '6'){
        this.rootPage = TabsPage;
      }
      if(sessionStorage.getItem('idRol') == '6'){

        this.rootPage = AdminPage;
      }
    } else{
      this.rootPage = LoginPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ionViewWillEnter(){
    console.log('my app');
    if (sessionStorage.getItem('idUsuario')){
      this.rootPage = TabsPage;
    } else{
      this.rootPage = LoginPage;
    }
  }
}
