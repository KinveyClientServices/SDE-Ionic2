import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { NavController, ToastController } from 'ionic-angular';
import { BrandData } from '../../providers/brand-data';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

	products: any;
  myBrandData = {};

  constructor(public navCtrl: NavController, private ref: ChangeDetectorRef, private toastCtrl: ToastController, public brandData: BrandData) {

	}
	
	presentToast(text) {
		console.log("In Toast")
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  ionViewDidEnter() {
  	const dataStore = Kinvey.DataStore.collection('cintasProducts', Kinvey.DataStoreType.Sync);
    this.myBrandData = this.brandData.getBrand();
		dataStore.pull().then((entities: {}[]) => {

			this.products = entities;
			
    	this.ref.detectChanges();
		}).catch((error: Kinvey.BaseError) => {
			console.log(error);
		});
  	// dataStore.find()
  	// .subscribe((entities: {}[]) => {
    // 	console.log(entities);
    // 	this.products = entities;
    // 	this.ref.detectChanges();
  	// }, (error: Kinvey.KinveyError) => {
    // 	console.log(error);
  	// }, () => {
    // 	console.log('finished fetching products');
  	// });
	}
	
	addProduct(item) {
		var that = this;
		console.log("item", item)
		const dataStore = Kinvey.DataStore.collection('BuildOrder', Kinvey.DataStoreType.Sync);
		dataStore.save({
			title: item.title,
			price: item.price
		})
		.then(function(entity: {}) {
			console.log("IN THEN")
			that.presentToast(entity.title + " added to order");
			console.log("DELACEY: ", entity);
		}).catch(function(error: Kinvey.BaseError) {
			// ...
		});
	}

}
