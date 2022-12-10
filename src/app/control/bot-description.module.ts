import {NgModule} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReturnChartModule} from './return-chart.module';
import {CommonModule} from "@angular/common";
import {BotInfoModule} from "./bot-info.module";
import {BotDescriptionComponent} from "../view/bot-description/bot-description.component";
import {ParametersTableModule} from "./parameters-table.module";


@NgModule({
  declarations: [
    BotDescriptionComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        ReturnChartModule,
        BotInfoModule,
        ParametersTableModule,
    ],
  exports: [
    BotDescriptionComponent
  ]
})
export class BotDescriptionModule {
}
