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

  constructor(public navCtrl: NavController,
              private fb: FormBuilder,
              public navParams: NavParams,
              private _loginService: LoginProvider) {

                this._loginService.logout();


                this.form = this.fb.group({
                  usuario: new FormControl(this.campos.usuario),
                  password: new FormControl(this.campos.password)
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this._loginService.login(this.form.value.usuario, this.form.value.password)
    .subscribe(
      res=>{
        console.log(res);
        this.navCtrl.setRoot(TabsPage);
      },
      e=>{
        console.log(e);
      }
    )
  }


}
