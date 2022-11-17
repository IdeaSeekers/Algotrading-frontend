import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {NavigationService} from "../../control/navigation.service";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {BackendService} from "../../control/backend.service";
import { map } from 'rxjs';

@Component({
  selector: 'strategy-list-item',
  templateUrl: './strategy-list-item.component.html',
  styleUrls: ['./strategy-list-item.component.css']
})
export class StrategyListItemComponent implements AfterViewInit {
  @Input() strategy!: Strategy

  @ViewChild('chart') chart!: ReturnChartComponent

  constructor(private backend: BackendService, private navigationService: NavigationService) {
  }

  ngAfterViewInit(): void {
    this.chart.updateChartData(
      this.backend
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
