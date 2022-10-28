import {NgModule} from '@angular/core';
import {BotCreationFormComponent} from "../view/bot-creation-form/bot-creation-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BotCreationFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BotCreationFormComponent
  ]
})
export class BotCreationFormModule {
}
