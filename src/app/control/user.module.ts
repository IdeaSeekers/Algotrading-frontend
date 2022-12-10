import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignupComponent} from '../view/signup/signup.component';
import {FormsModule} from "@angular/forms";
import {SigninComponent} from '../view/signin/signin.component';


@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SignupComponent,
    SigninComponent
  ]
})
export class UserModule {
}
