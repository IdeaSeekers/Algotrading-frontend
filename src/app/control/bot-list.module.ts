import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BotListItemComponent} from "../view/bot-list-item/bot-list-item.component";
import {BotInfoModule} from "./bot-info.module";
import {BotListComponent} from "../view/bot-list/bot-list.component";


@NgModule({
  declarations: [
    BotListComponent,
    BotListItemComponent
  ],
  imports: [
    CommonModule, BotInfoModule
  ],
  exports: [
    BotListComponent
  ]
})
export class BotListModule {
}
