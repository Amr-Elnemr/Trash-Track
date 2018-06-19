import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { NgForm } from '@angular/forms';

import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  unAuthorised = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    // public signinService: SigninService,

    public http: HTTP
    ) {
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

    //************* Temp *********************************
    if(loggedName == "driver" && loggedPw == "driver"){ 
      this.navCtrl.push(HomePage, {userName: loggedName});
    }
    else{
      loader.dismiss();
      this.unAuthorised = true;
      console.log("Invalid login")
    }
    // ****************************************************


    // // ****************** When server is ready ************************
    // this.http.post('https://9689764e-901e-45ee-8ea4-8ea022346c8f.mock.pstmn.io/login', {"name": "driver", "password": "driver"}, {})
    // .then(data => {
    //   console.log(data);
    //   this.navCtrl.push(HomePage, {userName: loggedName});

    // })
    // .catch(error => {
    //   console.log(error.status);
    //   loader.dismiss();
    //   this.unAuthorised = true;
    //   console.log("Invalid login")
     
    // });
    // // ******************************************************************
    
  }

}
