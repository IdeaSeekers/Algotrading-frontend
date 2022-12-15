import {Component} from '@angular/core';
import {UserService} from "../../control/services/user.service";
import {NavigationService} from "../../control/services/navigation.service";

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  username: string = ''
  password: string = ''

  constructor(
    private userService: UserService,
    private navigationService: NavigationService
  ) {
    this.onSubmitProvider = this.onSubmit.bind(this)
  }

  onSubmitProvider: () => void

  onSubmit() {
    this.userService.signIn({
      username: this.username,
      password: this.password
    }).subscribe().add(() => this.navigationService.loadStrategiesList())
  }

}
