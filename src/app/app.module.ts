import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProductPage } from '../pages/product/product';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RefPage } from '../pages/ref/ref';
import { RefDetailPage } from '../pages/refdetail/refdetail';
import { AccountsPage } from '../pages/accounts/accounts';
import { OfflinePage } from '../pages/offline/offline';
import { AccountDetailPage } from '../pages/accountdetail/accountdetail';
import { LoginPage } from '../pages/login/login';
import { TasksPage } from '../pages/tasks/tasks';
import { MapPage } from '../pages/map/map';
import { AllTasksPage } from '../pages/alltasks/alltasks';
import { ChatPage } from '../pages/chat/chat';
import { BrandData } from '../providers/brand-data';
import { File } from '@ionic-native/file'
import { BrowserModule } from '@angular/platform-browser';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureFieldComponent } from './signature-field/signature-field.component';

@NgModule({
  declarations: [
    MyApp,
    ProductPage,
    SearchPage,
    HomePage,
    TabsPage,
    RefPage,
    AccountsPage,
    OfflinePage,
    LoginPage,
    TasksPage,
    AccountDetailPage,
    RefDetailPage,
    MapPage,
    AllTasksPage,
    ChatPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProductPage,
    SearchPage,
    HomePage,
    TabsPage,
    AccountsPage,
    OfflinePage,
    RefPage,
    LoginPage,
    TasksPage,
    AccountDetailPage,
    RefDetailPage,
    MapPage,
    AllTasksPage,
    ChatPage
  ],
  providers: [ {provide: ErrorHandler, useClass: IonicErrorHandler}, File, BrandData]
})
export class AppModule {}
