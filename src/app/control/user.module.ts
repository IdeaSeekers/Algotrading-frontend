import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from '../view/signup/signup.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SignupComponent
  ]
})
export class UserModule {
}
