import {Component} from '@angular/core';
import {UserService} from "../../control/services/user.service";
import {NavigationService} from "../../control/services/navigation.service";

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  username: string = ''
  password: string = ''
  tinkoff: string = ''

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this.onSubmitProvider = this.onSubmit.bind(this)
  }

  onSubmitProvider: () => void

  onSubmit() {
    this.userService.signUp({
      username: this.username,
      password: this.password,
      tinkoff: this.tinkoff
    }).subscribe().add(() => this.navigationService.loadSignIn())
  }

}
