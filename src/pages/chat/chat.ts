import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Events, MenuController, NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { AccountDetailPage } from '../accountdetail/accountdetail';
import { BrandData } from '../../providers/brand-data';
import { ToastController } from 'ionic-angular';
//import { MyApp } from '../../app/brand-data';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage implements OnDestroy  {

	chats = [];
  myBrandData = {};
  chatData = {
    msg: ""
  }

   Stream = (Kinvey as any).LiveService.Stream;
   StreamACL = this.Stream.StreamACL;
   stream;// = new this.Stream('chats');

  ngOnDestroy() {
    console.log('on destroy');
    this.ref.detach();

    this.stream.stopListening()
      .then(() => {
        console.log('successfully stopped following stream');
     })
    .catch((err) => {
        console.log(err);
    });

    this.stream = null;

  }

  constructor(private toastCtrl: ToastController, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData, private myMenu: MenuController, public events:Events) {

  }


  refreshMe() {
    console.log('refreshing accounts');

    /*const dataStore = Kinvey.DataStore.collection('chats', Kinvey.DataStoreType.Network) as any;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      console.log(entities);
      this.chats = entities;
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts');
    });*/
  }

  addMe() {
    console.log('adding chat');

    //this.stream = new (Kinvey as any).LiveService.Stream('chats');
    this.stream.post(this.chatData)
    .then(() => {
      console.log('success');
      //this.chats.push(this.chatData);
      this.ref.detectChanges();
      //this.ref.markForCheck();
    })
    .catch(e => {console.log(e)});
  }


  ionViewWillLeave() {
    console.log('leaving chat view');

    this.ref.detach();
    this.stream.stopListening()
      .then(() => {
        console.log('successfully stopped following stream');
     })
    .catch((err) => {
        console.log(err);
    });
  }

  
  ionViewDidLoad() {

this.stream = new this.Stream('chats');
    console.log('ionViewDidLoad ChatPage');
    //console.log(this.brandData.getBrand());

    this.refreshMe();

    var activeUser = Kinvey.User.getActiveUser();

    console.log(activeUser);

    (activeUser as any).registerForLiveService()
       .then(() => {
          console.log('successfully registered for live service');
       })
       .catch(err => {
          console.log('live service error: ' + err);
     });

    // now subscribe to the chat channel
    //

    const aclDemo = new this.StreamACL()
      .addPublishers('58b6fc8f955c59975a1c1ce7')  //
      .addPublishers('59c16eb2eedfe14a3f4c1f6d') // or use an array: [ john._id, george._id ]
      .addSubscribers('59c16eb2eedfe14a3f4c1f6d')
      .addSubscribers('58b6fc8f955c59975a1c1ce7');

      //const activeUser = Kinvey.User.getActiveUser();

      var myuser = activeUser.data as any;

      console.log(myuser.username);


      this.stream.setACL('58b6fc8f955c59975a1c1ce7', aclDemo)
        .then((response) => {
        // success
        // "response" is the newly set ACL object sent back by the server
        console.log(response);

        // now follow the stream
        //
        this.stream.follow('58b6fc8f955c59975a1c1ce7', {
          onMessage: (m) => { 
            console.log(m); 
            this.chats.push(m);
            this.ref.detectChanges();
            //this.ref.markForCheck();
          },
          onStatus: (s) => { console.log(s); },
          onError: (e) => { console.log(e); }
        })
        .then(() => {console.log('successfully following stream');})
        .catch(e => {console.log(e);});
        })
        .catch((err) => {
          console.log(err);
        });


        this.stream.setACL('59c16eb2eedfe14a3f4c1f6d', aclDemo)
        .then((response) => {
          // success
          // "response" is the newly set ACL object sent back by the server
          console.log(response);

          // now follow the stream
          //
          this.stream.follow('59c16eb2eedfe14a3f4c1f6d', {
            onMessage: (m) => { console.log(m); 
              this.chats.push(m);
              //this.ref.markForCheck();
              this.ref.detectChanges();
            },
            onStatus: (s) => { console.log(s); },
            onError: (e) => { console.log(e); }
          })
            .then(() => {console.log('successfully following stream');})
            .catch(e => {console.log(e);});
        })
        /*.catch((err) => {
          console.log(err);
        });*/
  }
}