import {NgModule} from '@angular/core';
import {StrategyDescriptionComponent} from "../view/strategy-description/strategy-description.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReturnChartModule} from './return-chart.module';
import {StrategyBriefModule} from './strategy-brief.module';
import {BotCreationFormModule} from "./bot-creation-form.module";


@NgModule({
  declarations: [
    StrategyDescriptionComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatButtonToggleModule,
    ReturnChartModule,
    StrategyBriefModule,
    BotCreationFormModule
  ],
  bootstrap: [
    StrategyDescriptionComponent
  ]
})
export class StrategyDescriptionModule {
}
