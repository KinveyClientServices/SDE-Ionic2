import { Component, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

//import { AccountDetailPage } from '../accountdetail/accountdetail';
import { BrandData } from '../../providers/brand-data';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google;
//var gmarkers = [];


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'

})
export class MapPage {

  accounts = [];
  myBrandData = {};

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  locations: any;
  gmarkers = [];

  constructor(private toastCtrl: ToastController, private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams) { }

  loadMap() {
    console.log('initializing map');

    var myLatlng = new google.maps.LatLng(37.981345, -84.571806);

    var mapOptions = {
      center: myLatlng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement,
      mapOptions);
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

  registerService() {
    // initiate realtime service
    //
    const activeUser = Kinvey.User.getActiveUser();

    (activeUser as any).registerForLiveService()
      .then(() => {
        console.log('successfully registered for live service');
        var myaccounts = Kinvey.DataStore.collection('live', Kinvey.DataStoreType.Network) as any;

        myaccounts.subscribe({
          onMessage: (m) => {
            console.log(m);
            console.log(m._geoloc);

            this.clearMap();

            var mylat = parseFloat(m._geoloc[0]);
            var mylong = parseFloat(m._geoloc[1]);
            console.log(mylat + ", " + mylong);
            console.log(m.accountname);

            var info = new google.maps.InfoWindow({
              content: '<b>Who:</b> ' + m.accountname + '<br><b>Notes:</b> ' + m.accountcompany
            });


            var myLatlng = new google.maps.LatLng(mylat, mylong);


            var marker = new google.maps.Marker({
              position: myLatlng,
              map: this.map,
              title: m.accountname
            });



            try {
              this.gmarkers.push(marker);
            } catch (e) {
              console.log(e);
            }

            google.maps.event.addListener(marker, 'click', (function (info) {
              return function () {
                info.open(this.map, this);
              }
            })(info));
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
          .then(() => { console.log('success'); })
          .catch(e => { console.log(e); });
      });

  }


  populateMap() {
    console.log('populating map');

    const dataStore = Kinvey.DataStore.collection('live', Kinvey.DataStoreType.Network) as Kinvey.NetworkStore;

    var stream = dataStore.findById('59de4c5f2ab51639e2f1073e');

    stream.subscribe((thisentity: {}) => {
      var entity = thisentity as any;
      console.log(entity);
      var mylat = parseFloat(entity._geoloc[0]);
      var mylong = parseFloat(entity._geoloc[1]);
      console.log(mylat + ", " + mylong);
      console.log(entity.accountname);

      var info = new google.maps.InfoWindow({
        content: '<b>Who:</b> ' + entity.accountname + '<br><b>Notes:</b> ' + entity.accountcompany
      });
      console.log("1");

      var myLatlng = new google.maps.LatLng(mylat, mylong);
      console.log("2");

      var marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        title: entity.accountname
      });

      console.log("3");

      try {
        this.gmarkers.push(marker);
      } catch (e) {
        console.log(e);
      }
      console.log("4");
      google.maps.event.addListener(marker, 'click', (function (info) {
        return function () {
          info.open(this.map, this);
        }
      })(info));
      console.log("5");

    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts for mapping');
    });

  }

  refreshMe() {
    console.log('refreshing accounts');

    /*const dataStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network) as any;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      console.log(entities);
      this.accounts = entities;
    }, (error: Kinvey.KinveyError) => {
      console.log(error);
    }, () => {
      this.ref.detectChanges();
      console.log('finished loading accounts');
    });*/
  }

  clearMap() {
    for (var i = 0; i < this.gmarkers.length; i++) {
      this.gmarkers[i].setMap(null);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    this.loadMap();
    this.populateMap();
    this.registerService();


  }
}
