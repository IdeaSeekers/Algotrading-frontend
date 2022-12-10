import {Component, OnInit} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {IdList} from "../../model/id-list.model";
import {StrategyService} from "../../control/services/strategy.service";
import {ParametersService} from "../../control/services/parameters.service";

@Component({
  selector: 'strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {

  strategies: Array<Strategy> = []

  private strategiesData: IdList<Strategy>

  constructor(private strategyService: StrategyService, private parametersService: ParametersService) {
    this.strategiesData = new IdList<Strategy>(
      strategyService.getStrategiesId.bind(strategyService),
      id => strategyService.getStrategyById({id: id})
    )
  }

  ngOnInit(): void {
    this.strategiesData.getFreshData().subscribe(([id, strategy]) => {
      this.strategies.push(strategy)
      this.strategyService.getAverageStrategyReturn({id: id}).subscribe(value => {
        strategy.averageReturn = value
      })
      this.strategyService.getNumberOfActiveBots({id: id}).subscribe(value => {
        strategy.activeBots = value
        this.strategies.sort((a, b) => b.activeBots - a.activeBots)
      })
      for (let [idx, param] of strategy.parameters.entries()) {
        this.parametersService.getParameterById({id: param.id}).subscribe(value => {
          strategy.parameters[idx] = value
        })
      }
    })
  }
}
