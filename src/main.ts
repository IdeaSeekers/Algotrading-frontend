import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/control/app.module';
import { environment } from './environments/environment';
import {StrategyDescriptionModule} from "./app/control/strategy-description.module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(StrategyDescriptionModule)
  .catch(err => console.error(err));
