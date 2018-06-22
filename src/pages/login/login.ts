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

  ServerState = "";

  // temp2;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    // public signinService: SigninService,

    public http: HTTP
    ) {
  }

  ionViewDidEnter() {
    console.log("Calling ...")
    // ****************** Get Access ************************
    this.http.post('http://174.138.125.84/Login', {"username": "Amr_Elnemr", "password": "mot@iti"}, {})
    .then(data => {
      console.log(data);
      // this.ServerState = "Connection established";

    })
    .catch(error => {
      console.log(error);
      console.log("No Access")
      this.ServerState = "Server Connection Error ! \n try restarting the app or contact the administrator for help.";
     
    });
    // ******************************************************************

  }


  onLogin(form: NgForm){
    const loggedName = form.form.controls.username.value;
    const loggedPw = form.form.controls.password.value;
    const loader = this.loadingCtrl.create({
      content: "Signing in...",
      dismissOnPageChange: true
    })
    loader.present();
    console.log(form);

    // //************* Temp *********************************
    // if(loggedName == "driver" && loggedPw == "driver"){ 
    //   this.navCtrl.push(HomePage, {userName: loggedName});
    // }
    // else{
    //   loader.dismiss();
    //   this.unAuthorised = true;
    //   console.log("Invalid login")
    // }
    // // ****************************************************


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
    this.http.post('http://174.138.125.84/ExecuteQuerySafe', 
                  {"query": "SELECT * FROM APPLICATION_40 WHERE name='" + loggedName + "'AND password='" + loggedPw +"'"}, {})
    .then(Data => {
      console.log(Data);
      
      let loggedData = (Data.data);
      loggedData = loggedData.replace(/[\[\]']+/g,'');
      let driverName = JSON.parse(loggedData).name;
      // this.temp2 = driverName;

      this.navCtrl.push(HomePage, {userName: driverName});

    })
    .catch(error => {
      console.log(error.status);
      loader.dismiss();
      this.unAuthorised = true;
      console.log("Invalid login")
     
    });
    
    
  }

}
