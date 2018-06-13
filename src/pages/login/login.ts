import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  unAuthorised = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }

  onLogin(form: NgForm){
    const loggedName = form.form.controls.username.value;
    const loggedPw = form.form.controls.password.value;
    const loader = this.loadingCtrl.create({
      content: "Signing in...",
      dismissOnPageChange: true
    })
    loader.present();
    console.log(form);

    if(loggedName == "driver" && loggedPw == "driver"){ 
      this.navCtrl.push(HomePage, {userName: loggedName});
    }
    else{
      loader.dismiss();
      this.unAuthorised = true;
      console.log("Invalid login")
    }
    
    
  }

}
