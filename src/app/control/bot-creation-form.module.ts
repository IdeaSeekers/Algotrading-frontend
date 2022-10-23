import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {BotCreationFormComponent} from "../view/bot-creation-form/bot-creation-form.component";


@NgModule({
  declarations: [
    BotCreationFormComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [
    BotCreationFormComponent
  ]
})
export class BotCreationFormModule {
}
