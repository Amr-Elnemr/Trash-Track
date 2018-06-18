import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { Geolocation , Geoposition } from '@ionic-native/geolocation';



@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html',
})
export class RidePage {
// 29.030391, 31.110125
	myLat: number = 0;	//temp
	myLng: number = 0;  //temp

	scale = 35;

	myPath = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private geolocation: Geolocation,
		) {

	}





	ionViewDidLoad() {

// ******************** will uncomment after development **************************
		// console.log(this.geolocation);
    // 	this.geolocation.getCurrentPosition()
    // 	.then((resp) => {
		// 	this.myLat = resp.coords.latitude;
		// 	this.myLng = resp.coords.longitude;
		// 	this.myPath = this.getRoute();
		// 	console.log(this.myPath)
    //
		// }).catch((error) => {
		//   console.log('Error getting location', error);
		// });

//**********************************************************************************

// track device

let watch = this.geolocation.watchPosition().subscribe(position => {
    if ((position as Geoposition).coords != undefined) {
      var geoposition = (position as Geoposition);

      console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);

      this.myLat = geoposition.coords.latitude;
  		this.myLng = geoposition.coords.longitude;
    } 
});

// ******************** will uncomment after development **************************
		this.myPath = this.getRoute();
		console.log(this.myPath)
//**********************************************************************************
	}

	truck = {
		url: '../../assets/imgs/truck.svg',
        scaledSize: {
        	width: this.scale+10,
        	height: this.scale+10
        }
	}

	empty = {
		url: '../../assets/imgs/empty.svg',
        scaledSize: {
        	width: this.scale,
        	height: this.scale
        }
	}

	med = {
		url: '../../assets/imgs/med.svg',
        scaledSize: {
        	width: this.scale,
        	height: this.scale
        }
	}

	full = {
		url: '../../assets/imgs/full.svg',
        scaledSize: {
        	width: this.scale,
        	height: this.scale
        }
	}


	getState(state){
		switch(state) {
		    case "empty":
		        return this.empty;
		    case "med":
		        return this.med;
		    case "full":
		        return this.full;
		}
	}
// ***************** From backend ***************************
// 29.0643815 ,31.0999373 menton
// 29.0629273 , 31.1003993 club
// 29.0619371 , 31.1005927 coffe
	data = [
		{
			id:1,
			lat: 29.03035819,
			lng: 31.11001926,
			state: "empty"
		},
		{
			id:2,
			lat: 29.02897919,
			lng: 31.10950428,
			state: 'med'
		},
		{
			id:3,
			lat: 29.02886662,
			lng: 31.11092048,
			state: 'full'
		}
	]

// ******************************************************

	getRoute(){
		let mData = [];
		let tempObj = {
			origin: {lat: this.myLat, lng: this.myLng},
			destination: {lat: this.data[0].lat, lng: this.data[0].lng}
		}
		mData.push(tempObj);

		for (var i=0; i<this.data.length-1; i++){
			tempObj = {
				origin: {lat: this.data[i].lat, lng: this.data[i].lng},
				destination: {lat: this.data[i+1].lat, lng: this.data[i+1].lng}
			}
			mData.push(tempObj);
		}

		return mData;
	}

}
