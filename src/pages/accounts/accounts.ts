import { Component, ChangeDetectorRef } from '@angular/core';
import { Events, MenuController, NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';
import { AccountDetailPage } from '../accountdetail/accountdetail';
import { BrandData } from '../../providers/brand-data';
import { ToastController } from 'ionic-angular';


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
  //providers: [BrandData]
})
export class AccountsPage {

	accounts = [];
  myBrandData = {};



  constructor(private toastCtrl: ToastController, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData, private myMenu: MenuController, public events:Events) {}

  getDetail(account) {
    console.log('getting detail 2');

    console.log(account);
    this.navCtrl.push(AccountDetailPage, {
      account: account
    });
  }


  refreshMe() {
    console.log('refreshing accounts');

    const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as Kinvey.NetworkStore;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      console.log(entities);
      this.accounts = entities;
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    console.log(this.brandData.getBrand());
    //console.log(this.parent.pages);
    //console.log(this.myMenu.getMenus());

    var myaccounts = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

    myaccounts.subscribe({
      onMessage: (m) => {
        console.log(m);

        let toast = this.toastCtrl.create({
    message: JSON.stringify(m),
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
      },
      onStatus: (s) => {
        // handle status events, which pertain to this collection
        console.log(s);
      },
      onError: (e) => {
        // handle error events, which pertain to this collection
        console.log(e);
      }
})
  .then(() => {console.log('success');})
  .catch(e => {console.log(e);});
    
    this.myBrandData = this.brandData.getBrand();
    
    this.refreshMe();
  }



}
