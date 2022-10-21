import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReturnChartComponent} from "../view/return-chart/return-chart.component";
import {HighchartsChartModule} from "highcharts-angular";

@NgModule({
  declarations: [
    ReturnChartComponent
  ],
  exports: [
    ReturnChartComponent
  ],
  imports: [
    CommonModule,
    HighchartsChartModule
  ]
})
export class ReturnChartModule {
}
