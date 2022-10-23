import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StrategyBriefComponent} from "../view/strategy-brief/strategy-brief.component";


@NgModule({
  declarations: [
    StrategyBriefComponent
  ],
  exports: [
    StrategyBriefComponent
  ],
  imports: [
    CommonModule
  ]
})
export class StrategyBriefModule {
}
