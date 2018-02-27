import { Component, ChangeDetectorRef } from '@angular/core';
import { Kinvey } from 'kinvey-angular2-sdk';
import { Events, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { BrandData } from '../../providers/brand-data';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public events: Events) {

  }

  ionViewDidEnter() {
    console.log('loading home screen');
    if (!Kinvey.User.getActiveUser()) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  navigateToTabsPage() {
    this.navCtrl.setRoot(TabsPage);
  }

}
