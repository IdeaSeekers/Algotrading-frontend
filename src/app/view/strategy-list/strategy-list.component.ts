import {Component, OnInit} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {BackendService} from "../../control/backend.service";
import {IdList} from "../../model/id-list.model";

@Component({
  selector: 'strategy-list',
  templateUrl: './strategy-list.component.html',
  styleUrls: ['./strategy-list.component.css']
})
export class StrategyListComponent implements OnInit {

  strategies: Array<Strategy> = []

  private strategiesData: IdList<Strategy>

  constructor(private backend: BackendService) {
    this.strategiesData = new IdList<Strategy>(
      backend.getStrategiesId.bind(backend),
      id => backend.getStrategyById({id: id})
    )
  }

  ngOnInit(): void {
    this.strategiesData.getFreshData().subscribe(([id, strategy]) => {
      this.strategies.push(strategy)
      this.backend.getAverageStrategyReturn({id: id}).subscribe(value => {
        strategy.averageReturn = value
      })
      this.backend.getNumberOfActiveBots({id: id}).subscribe(value => {
        strategy.activeBots = value
        this.strategies.sort((a, b) => b.activeBots - a.activeBots)
      })
    })
  }
}
