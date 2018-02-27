import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { NavController } from 'ionic-angular';


@Component({
	selector: 'page-product',
	templateUrl: 'product.html'
})
export class ProductPage {
	visits: any;
	collection: string;

	constructor(public navCtrl: NavController, private ref: ChangeDetectorRef) {
		this.collection = "visits";
	}

	ionViewDidLoad() {
		console.log("Visits view loaded");
		const dataStore = Kinvey.DataStore.collection(this.collection, Kinvey.DataStoreType.Network);

		dataStore.find()
			.subscribe((entities: {}[]) => {
				console.log(entities);
				this.visits = entities;
				//this.ref.detectChanges();
			}, (error: Kinvey.KinveyError) => {
				console.log(error);
			}, () => {
				console.log('finished fetching products');
			});
	}

}
