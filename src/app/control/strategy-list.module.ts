import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyListComponent} from '../view/strategy-list/strategy-list.component';
import {BrowserModule} from "@angular/platform-browser";
import {StrategyListItemComponent} from '../view/strategy-list-item/strategy-list-item.component';
import {StrategyBriefModule} from "./strategy-brief.module";
import {ReturnChartModule} from "./return-chart.module";


@NgModule({
  declarations: [
    StrategyListComponent,
    StrategyListItemComponent
  ],
  imports: [
    CommonModule, BrowserModule, StrategyBriefModule, ReturnChartModule
  ],
  bootstrap: [
    StrategyListComponent
  ]
})
export class StrategyListModule {
}
