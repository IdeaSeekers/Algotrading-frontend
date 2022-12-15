import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewComponentDirective} from "./view-component.directive";
import {NavigationService} from "../control/services/navigation.service";
import {NavigationEventModel} from "../model/navigation-event.model";
import {BotListComponent} from "./bot-list/bot-list.component";
import {SignupComponent} from "./signup/signup.component";
import {UserService} from "../control/services/user.service";
import {SigninComponent} from "./signin/signin.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', 'nav-bar.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(ViewComponentDirective, {static: true}) viewHost!: ViewComponentDirective;

  constructor(private navigation: NavigationService, private userService: UserService) {
  }

  isBotList: boolean = false
  isSignUp: boolean = false
  isSignIn: boolean = false

  get isAuthorized(): boolean {
    return this.userService.isAuthorized()
  }
  private viewComponent(event: NavigationEventModel) {
    this.isBotList = event.component == BotListComponent
    this.isSignUp = event.component == SignupComponent
    this.isSignIn = event.component == SigninComponent

    const viewContainerRef = this.viewHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<Component>(event.component)
    if (event.init) {
      event.init(componentRef.instance)
    }
  }

  navigateStrategyList() {
    this.navigation.loadStrategiesList()
  }

  navigateBotList() {
    this.navigation.loadBotsList()
  }

  navigateSignUp() {
    this.navigation.loadSignUp()
  }

  navigateSignIn() {
    this.navigation.loadSignIn()
  }

  ngOnInit(): void {
    this.navigation.navigationEvents.subscribe(event => {
      this.viewComponent(event)
    })

    this.navigation.loadStrategiesList()

    let nav = document.querySelector(".nav-container");

    if (nav != null) {
      let toggle = nav.querySelector(".nav-toggle");

      if (toggle) {
        toggle.addEventListener("click", () => {
          if (nav!!.classList.contains("is-active")) {
            nav!!.classList.remove("is-active");
          } else {
            nav!!.classList.add("is-active");
          }
        });

        nav.addEventListener("blur", () => {
          nav!!.classList.remove("is-active");
        });
      }
    }
  }

}
