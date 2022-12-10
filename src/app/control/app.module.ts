import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from '../view/app.component';
import {StrategyListModule} from "./strategy-list.module";
import {StrategyDescriptionModule} from "./strategy-description.module";
import {ViewComponentDirective} from '../view/view-component.directive';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BotListModule} from "./bot-list.module";
import {BotDescriptionModule} from "./bot-description.module";
import {UserService} from "./services/user.service";
import { UserModule } from './user.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponentDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    StrategyListModule,
    StrategyDescriptionModule,
    BotListModule,
    BotDescriptionModule,
    UserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
