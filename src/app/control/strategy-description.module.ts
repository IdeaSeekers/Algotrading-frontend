import {NgModule} from '@angular/core';
import {StrategyDescriptionComponent} from "../view/strategy-description/strategy-description.component";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {ReturnChartModule} from './return-chart.module';
import {StrategyBriefModule} from './strategy-brief.module';
import {BotCreationFormModule} from "./bot-creation-form.module";
import {CommonModule} from "@angular/common";
import {ParametersTableModule} from "./parameters-table.module";


@NgModule({
  declarations: [
    StrategyDescriptionComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        ReturnChartModule,
        StrategyBriefModule,
        BotCreationFormModule,
        ParametersTableModule
    ],
  exports: [
    StrategyDescriptionComponent
  ]
})
export class StrategyDescriptionModule {
}
