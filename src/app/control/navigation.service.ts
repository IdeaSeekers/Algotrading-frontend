import {EventEmitter, Injectable} from '@angular/core';
import {NavigationEventModel} from "../model/navigation-event.model";
import {StrategyListComponent} from "../view/strategy-list/strategy-list.component";
import {Strategy} from "../model/strategy.model";
import {StrategyDescriptionComponent} from "../view/strategy-description/strategy-description.component";
import {BotListComponent} from "../view/bot-list/bot-list.component";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  navigationEvents = new EventEmitter<NavigationEventModel>(true)

  loadStrategiesList() {
    this.navigationEvents.emit(new NavigationEventModel(
      StrategyListComponent,
      undefined
    ))
  }

  loadStrategyDescription(strategy: Strategy) {
    this.navigationEvents.emit(new NavigationEventModel(
      StrategyDescriptionComponent,
      (component: StrategyDescriptionComponent) => {
        component.strategy = strategy
      }
    ))
  }

  loadBotsList() {
    this.navigationEvents.emit(new NavigationEventModel(
      BotListComponent,
      undefined
    ))
  }

}
