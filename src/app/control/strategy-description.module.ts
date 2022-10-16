import {NgModule} from '@angular/core';
import {StrategyDescriptionComponent} from "../view/strategy-description/strategy-description.component";
import {BrowserModule} from "@angular/platform-browser";
import {MatTabsModule} from "@angular/material/tabs";
import {StrategyBriefComponent} from "../view/strategy-brief/strategy-brief.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    StrategyDescriptionComponent, StrategyBriefComponent
  ],
  imports: [
    BrowserModule, MatTabsModule, BrowserAnimationsModule
  ],
  bootstrap: [
    StrategyDescriptionComponent
  ]
})
export class StrategyDescriptionModule {
}
