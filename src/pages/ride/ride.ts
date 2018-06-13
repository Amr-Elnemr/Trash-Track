import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-ride',
  templateUrl: 'ride.html',
})
export class RidePage {

	myLat = 30.071538;	//temp
	myLng = 31.020819;  //temp

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
  //   	this.geolocation.getCurrentPosition()
  //   	.then((resp) => {
		// 	this.myLat = resp.coords.latitude;
		// 	this.myLng = resp.coords.longitude;
		// 	this.myPath = this.getRoute();
		// 	console.log(this.myPath)

		// }).catch((error) => {
		//   console.log('Error getting location', error);
		// });

//**********************************************************************************

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
	data = [
		{
			id:1,
			lat: 30.074713,
			lng: 31.023833,
			state: "empty"
		},
		{
			id:2,
			lat: 30.074351,
			lng: 31.019132,
			state: 'med'
		},
		{
			id:3,
			lat: 30.072436,
			lng: 31.015542,
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
	

