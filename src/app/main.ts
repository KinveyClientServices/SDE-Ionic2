import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Kinvey } from 'kinvey-angular2-sdk';
import { AppModule } from './app.module';

Kinvey.initialize({
  appKey: 'kid_HJEfXKiZG',
  appSecret: '535c438e07d84f86994c3575d6ecbe6d'
})
  .then((activeUser?: Kinvey.User) => {
		platformBrowserDynamic().bootstrapModule(AppModule);
  });
