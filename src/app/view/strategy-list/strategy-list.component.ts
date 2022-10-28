import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {StrategyRisk} from "../../model/strategy-risk.model";

@Component({
  selector: 'strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent {

  @Input() strategies: Array<Strategy>

  constructor() {
    this.strategies = []
    for (let i = 0; i < 5; i++) {
      let strategy = new Strategy()

      strategy.name = "Strategy Name " + (i + 1).toString()
      strategy.activeBots = Math.floor(Math.random() * 1000)
      let ret = Math.random()
      strategy.averageReturn = ret * 0.35
      if (ret < 0.3) {
        strategy.risk = StrategyRisk.Low
      } else if (ret < 0.6) {
        strategy.risk = StrategyRisk.Medium
      } else {
        strategy.risk = StrategyRisk.High
      }

      this.strategies.push(strategy)
    }
  }
}
