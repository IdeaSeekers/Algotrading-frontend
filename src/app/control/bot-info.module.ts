import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BotInfoComponent} from "../view/bot-info/bot-info.component";


@NgModule({
  declarations: [
    BotInfoComponent
  ],
  exports: [
    BotInfoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BotInfoModule {
}
