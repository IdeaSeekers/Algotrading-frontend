import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {NavigationService} from "../../control/services/navigation.service";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {map} from 'rxjs';
import {StrategyService} from "../../control/services/strategy.service";

@Component({
  selector: 'strategy-list-item',
  templateUrl: './strategy-list-item.component.html',
  styleUrls: ['./strategy-list-item.component.css']
})
export class StrategyListItemComponent implements AfterViewInit {
  @Input() strategy!: Strategy

  @ViewChild('chart') chart!: ReturnChartComponent

  constructor(private strategyService: StrategyService, private navigationService: NavigationService) {
  }

  ngAfterViewInit(): void {
    this.chart.updateChartData(
      this.strategyService
        .getStrategyReturnHistory({id: this.strategy.id})
        .pipe(map(value => value.return_history.map(item => {
          return {
            timestamp: item.timestamp,
            value: item.average_return
          }
        })))
    )
  }

  loadStrategyDescription() {
    this.navigationService.loadStrategyDescription(this.strategy)
  }
}
