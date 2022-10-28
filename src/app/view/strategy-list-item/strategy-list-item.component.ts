import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {NavigationService} from "../../control/navigation.service";

@Component({
  selector: 'strategy-list-item',
  templateUrl: './strategy-list-item.component.html',
  styleUrls: ['./strategy-list-item.component.css']
})
export class StrategyListItemComponent {
  @Input() strategy!: Strategy

  constructor(private navigationService: NavigationService) {
  }

  loadStrategyDescription() {
    this.navigationService.loadStrategyDescription(this.strategy)
  }
}
