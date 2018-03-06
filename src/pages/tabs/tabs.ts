import { ChangeDetectorRef, Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProductPage } from '../product/product';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { BrandData } from '../../providers/brand-data';
import { Events, NavParams } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { MapPage } from '../map/map';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	doctors: any = AccountsPage;
	visits: any = ProductPage;
	nav: any = MapPage;

	//tabs:any;
	myTabs = [this.doctors, this.visits, this.nav];
	tabs: any;
	mySelectedIndex: any;


	constructor(private navParams: NavParams, private ref: ChangeDetectorRef, public events: Events) {


		this.mySelectedIndex = navParams.data.tabIndex || 0;

		console.log("Tab Index is : " + this.mySelectedIndex);

		console.log('*****constructed tabs*****');

		if (!this.tabs) {
			this.tabs = [
				{ "root": this.myTabs[0], "name": "Doctors", "icon": "md-people" },
				{ "root": this.myTabs[1], "name": "Visits", "icon": "md-briefcase" },
				{ "root": this.myTabs[2], "name": "Nearby", "icon": "md-pin" }

			];
		}

		//console.log(brandData.getBrand().tabStyles);
  	/*this.tabs = [
  	{"root": this.myTabs[0], "name": "MyHome", "icon":"md-home"},
  	{"root": this.myTabs[1], "name": "MyProducts", "icon":"md-briefcase"},
  	{"root": this.myTabs[2], "name": "MySearch", "icon":"md-search"},
  	{"root": this.myTabs[3], "name": "MyLogin", "icon":"md-lock"}

  	];*/

		console.log(this.tabs);

		events.subscribe('tabs:change', (changearray) => {
			console.log('TAB STYLES CHANGED');
			console.log(changearray.length);

			for (let i = 0; i < changearray.length; i++) {
				console.log(changearray[i].name);
				this.tabs[i].name = changearray[i].name;
				this.tabs[i].icon = changearray[i].icon;

			}
			console.log(this.tabs);
			this.ref.detectChanges();

		});
	}





	ionViewDidLoad() {


  	/*console.log('loaded tabs page');

  	let myTest = this.brandData.getBrand() as any;
  	console.log('spitting out brand data');
  	console.log(myTest);*/
	}
}
