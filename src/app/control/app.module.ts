import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from '../view/app.component';
import {StrategyListModule} from "./strategy-list.module";
import {StrategyDescriptionModule} from "./strategy-description.module";
import {ViewComponentDirective} from '../view/view-component.directive';
import {HttpClientModule} from '@angular/common/http';
import {BotListModule} from "./bot-list.module";

@NgModule({
  declarations: [
    AppComponent,
    ViewComponentDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StrategyListModule,
    StrategyDescriptionModule,
    BotListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
