import { Component } from '@angular/core';
import { NavController, NavParams, Toggle, Platform, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { RidePage } from '../ride/ride';
import { StatusService } from '../../services/status';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	state = "Offline";
  public name;

  constructor(
  	public navCtrl: NavController,
  	public navParams: NavParams,
  	public statusService: StatusService,
    private locationAccuracy: LocationAccuracy,
    public platform: Platform,
    public loadingCtrl: LoadingController
  	) {
  }

  ngOnInit(){
    this.name = this.navParams.get('userName');  
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }


  logout(){
  	// this.navCtrl.popToRoot();
    this.navCtrl.setRoot(LoginPage)
  }

  beAvailable(toggle: Toggle){
  	if(toggle.checked){
  		this.statusService.setAvailable;
  		this.state = "Available";
  	}
  	else{
  		this.statusService.setUnavailable;
  		this.state = "Offline";
  	}
  }

  goride(){
    const loader = this.loadingCtrl.create({
      content: "Loading your ride...",
      dismissOnPageChange: true
    });
    loader.present();
    if (this.platform.is('cordova')) {
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {
        if(canRequest) {
            // the accuracy option will be ignored by iOS
            this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY)
            .then(
                () => {
                        loader.dismiss();
                        console.log('Request successful'); 
                        this.navCtrl.push(RidePage);
                      },
                error =>  {
                            loader.dismiss();
                            console.log('Error requesting location permissions', error)
                          }
            );
         }
      });
    }
    else{
      loader.dismiss();
      this.navCtrl.push(RidePage);
    }
    
  }
}
