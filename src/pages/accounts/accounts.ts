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



  constructor(private toastCtrl: ToastController, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData, private myMenu: MenuController, public events:Events) {

  }

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

  addProduct() {
    console.log("Added")
  }

  ionViewDidLeave() {
    const activeUser = Kinvey.User.getActiveUser();
    activeUser.unregisterFromLiveService()
    .then(() => {
      console.log('successfully unregistered live service')
    })
    .catch(err => {
      console.log('error unregistering live service: ' + err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsPage');
    console.log(this.brandData.getBrand());
    
    // register the live service
    //
    const activeUser = Kinvey.User.getActiveUser();

        (activeUser as any).registerForLiveService()
          .then(() => {
            // var myaccounts = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

          //   myaccounts.subscribe({
          //     onMessage: (m) => {
          //       console.log(m);

          //       let toast = this.toastCtrl.create({
          //         message: JSON.stringify(m),
          //         duration: 3000,
          //         position: 'top'
          //       });

          //       toast.onDidDismiss(() => {
          //         console.log('Dismissed toast');
          //       });

          //       toast.present();

          //       var dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Sync) as Kinvey.SyncStore;

          //       // persist locally
          //       //
          //       const promise = dataStore.save(m).then((entity: {}) => {
          //         this.ref.detectChanges();

          //         for (var i=0; i < this.accounts.length; i++) {
          //           if ( this.accounts[i]._id == (entity as any)._id ) {
          //             this.accounts[i].accountname = (entity as any).accountname;
          //             this.ref.detectChanges();
          //           }
          //         }

          //       }).catch((error: Kinvey.BaseError) => {
          //         console.log(error);
          //       });
          //     },
          //     onStatus: (s) => {
          //       // handle status events, which pertain to this collection
          //       console.log(s);
          //     },
          //     onError: (e) => {
          //       // handle error events, which pertain to this collection
          //       console.log(e);
          //     }
          //   })
          // .then(() => {console.log('success');})
          // .catch(e => {console.log(e);});
            
            this.myBrandData = this.brandData.getBrand();
            
            this.refreshMe();
          })

  }
}
