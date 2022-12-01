import {NgModule} from '@angular/core';
import {BotCreationFormComponent} from "../view/bot-creation-form/bot-creation-form.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BotCreationFormComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [
    BotCreationFormComponent
  ]
})
export class BotCreationFormModule {
}
