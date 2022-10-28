import {Component, OnInit, ViewChild} from '@angular/core';
import {ViewComponentDirective} from "./view-component.directive";
import {NavigationService} from "../control/navigation.service";
import {NavigationEventModel} from "../model/navigation-event.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(ViewComponentDirective, {static: true}) viewHost!: ViewComponentDirective;

  constructor(private navigation: NavigationService) {
  }

  private historyViews: Array<NavigationEventModel> = []

  get hasPrevious(): boolean {
    return this.historyViews.length > 1
  }

  back() {
    this.historyViews.pop()
    this.viewComponent(this.historyViews[this.historyViews.length - 1])
  }

  private viewComponent(event: NavigationEventModel) {
    const viewContainerRef = this.viewHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent<Component>(event.component)
    if (event.init) {
      event.init(componentRef.instance)
    }
  }

  ngOnInit(): void {
    this.navigation.navigationEvents.subscribe(event => {
      this.historyViews.push(event)
      this.viewComponent(event)
    })

    this.navigation.loadStrategiesList()
  }

}
