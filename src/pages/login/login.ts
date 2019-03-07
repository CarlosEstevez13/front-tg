import { AdminPage } from './../admin/admin';
import { RegistroPage } from './../registro/registro';
import { LoginProvider } from './../../providers/login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  campos:any = {
    usuario:null,
    password: null
  };

  tabs:any;
  constructor(public navCtrl: NavController,
              private fb: FormBuilder,
              public navParams: NavParams,
              private _loginService: LoginProvider) {

                this._loginService.logout();
                
                this.tabs = document.getElementsByClassName('show-tabbar').item(0);

                this.form = this.fb.group({
                  usuario: new FormControl(this.campos.usuario),
                  password: new FormControl(this.campos.password)
                });
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad LoginPage');
    console.log(this.tabs);
   /*  tabs.style.display = 'none'; */
    
  
  }

  ionViewDidEnter(){
    if(this.tabs!=null){

      this.tabs.style.opacity = 0;
    }
  }

  login(){
    this._loginService.login(this.form.value.usuario, this.form.value.password)
    .subscribe(
      res=>{
        console.log(res);
        if(this.tabs!=null){

          this.tabs.style.opacity = 1;
        }
        console.log(this.form.value.usuario);
        if(this.form.value.usuario == 'admin'){
          this.navCtrl.setRoot(AdminPage);
        }
        if(this.form.value.usuario != 'admin'){

          this.navCtrl.setRoot(TabsPage);
        }
      },
      e=>{
        console.log(e);
      }
    )
  }

  registrarse(){
    this.navCtrl.push(RegistroPage);
  }


}
