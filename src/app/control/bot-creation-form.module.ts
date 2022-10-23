import {NgModule} from '@angular/core';
import {BotCreationFormComponent} from "../view/bot-creation-form/bot-creation-form.component";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    BotCreationFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BotCreationFormComponent
  ]
})
export class BotCreationFormModule {
}
