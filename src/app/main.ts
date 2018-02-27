import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Kinvey } from 'kinvey-angular2-sdk';
import { AppModule } from './app.module';

Kinvey.initialize({
  appKey: 'kid_ByFYJ8SDf',
  appSecret: 'afacbbc33be64dbeab41c05a28597f6e'
})
  .then((activeUser?: Kinvey.User) => {
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
