import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";

@Component({
  selector: 'strategy-list-item',
  templateUrl: './strategy-list-item.component.html',
  styleUrls: ['./strategy-list-item.component.css']
})
export class StrategyListItemComponent {
  @Input() strategy!: Strategy
}
