import { Component,ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Kinvey } from 'kinvey-angular2-sdk';

import { AccountDetailPage } from '../accountdetail/accountdetail';
import { BrandData } from '../../providers/brand-data';
import { SignaturePad }                            from 'angular2-signaturepad/signature-pad';


/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


@Component({
  selector: 'page-alltasks',
  templateUrl: 'alltasks.html'
  //providers: [BrandData]
})
export class AllTasksPage {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  

	tasks = [];
  myBrandData = {};

  constructor(private ref: ChangeDetectorRef, public navCtrl: NavController, public navParams: NavParams, private brandData: BrandData) {}

  public options: Object = {};
  
    public _signature: any = null;
  
    public propagateChange: Function = null;
  
    get signature(): any {
      return this._signature;
    }
  
    set signature(value: any) {
      this._signature = value;
      console.log('set signature to ' + this._signature);
      console.log('signature data :');
      console.log(this.signaturePad.toData());
      //this.propagateChange(this.signature);
    }
  
    public writeValue(value: any): void {
      if (!value) {
        return;
      }
      this._signature = value;
      this.signaturePad.fromDataURL(this.signature);
    }
  
    public registerOnChange(fn: any): void {
      this.propagateChange = fn;
    }
  
    public registerOnTouched(): void {
      // no-op
    }
  
    public ngAfterViewInit(): void {
      this.signaturePad.clear();
    }
  
    public drawBegin(): void {
      console.log('Begin Drawing');
    }
    public drawComplete(): void {
      this.signature = this.signaturePad.toDataURL('image/jpeg', 0.5);
    }
  
    public clear(): void {
      this.signaturePad.clear();
      this.signature = '';
    }
  getDetail(account) {
    console.log('getting detail 2');
    
    console.log(account);
    this.navCtrl.push(AccountDetailPage, {
      account: account
    });
  }


  refreshMe() {
    console.log('refreshing tasks');

    const dataStore = Kinvey.DataStore.collection('BuildOrder', Kinvey.DataStoreType.Sync) as any;

    dataStore.find()
    .subscribe((entities: {}[]) => {
      var subtotal = 0;
      
      for(var i = 0; i < entities.length; i++) {
        
        subtotal = subtotal + Number(entities[i].price)
      } 

      console.log("The Price: ", subtotal)
      entities.subtotal = subtotal
      console.log("entities.subtotal", entities.subtotal);        
      this.tasks = entities;
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
    this.myBrandData = this.brandData.getBrand();
    //this.brandData.setBrand({foo:"accounts"});
    this.refreshMe();
  }

  saveOrder() {
    var that = this;
    const dataStore = Kinvey.DataStore.collection('completedOrder', Kinvey.DataStoreType.Cache);
    console.log("Tasks: ", this.tasks)
		dataStore.save({
      orderdetails: this.tasks,
      price: this.tasks.subtotal,
			date: Date()
		})
		.then(function(entity: {}) {
      const buildDataStore = Kinvey.DataStore.collection('buildOrder', Kinvey.DataStoreType.Sync);
      
      const promise = buildDataStore.remove()
      .then((result: any) => {
        that.refreshMe();
        that.signaturePad.clear()
        console.log("deleted");        
      }).catch((error: Kinvey.BaseError) => {
        // ...
      });
			console.log("entity: ", entity);
		}).catch(function(error: Kinvey.BaseError) {
			// ...
		});
  }


}
