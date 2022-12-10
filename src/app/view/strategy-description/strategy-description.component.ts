import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {Strategy} from "../../model/strategy.model";
import {Title} from "@angular/platform-browser";
import {StrategyRisk} from "../../model/strategy-risk.model";
import {BotCreationFormComponent} from "../bot-creation-form/bot-creation-form.component";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {map} from "rxjs";
import {Parameter} from "../../model/parameter.model";
import {StrategyService} from "../../control/services/strategy.service";

@Component({
  selector: 'strategy-description',
  templateUrl: './strategy-description.component.html',
  styleUrls: ['strategy-description.component.css']
})
export class StrategyDescriptionComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() strategy: Strategy;

  @ViewChild('creationForm', {static: false}) set creationForm(value: BotCreationFormComponent | undefined) {
    if (value) {
      this.onCreationFormOpen(value)
    }
  }

  @ViewChild('chart') chart!: ReturnChartComponent

  showForm: boolean = false
  isInitialised: boolean = false
  parameters: Parameter[] = []

  ngAfterViewInit() {
    this.isInitialised = true
    this.parameters = [
      { id: 0, name: "Test par 1", description: "Test description", value: undefined },
      { id: 1, name: "Test par 2", description: "Test description", value: undefined },
    ]
    this.cdr.detectChanges()
    this.chart.updateChartData(
      this.strategyService
        .getStrategyReturnHistory({id: this.strategy.id})
        .pipe(map(value =>
          value.return_history.map(item => {
            return {
              timestamp: item.timestamp,
              value: item.average_return
            }
          })
        ))
    )
  }

  ngOnInit() {
    this.titleService.setTitle(this.strategy.name)
  }

  private readonly oldTitle: string

  constructor(private titleService: Title, private cdr: ChangeDetectorRef, private strategyService: StrategyService) {
    this.strategy = new Strategy()
    this.strategy.name = "Strategy Name";
    this.strategy.risk = StrategyRisk.Low;
    this.strategy.activeBots = 512;
    this.strategy.averageReturn = 0.06;

    this.oldTitle = this.titleService.getTitle()
    this.titleService.setTitle(this.strategy.name);
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.oldTitle)
  }

  onCreationFormOpen(creationForm: BotCreationFormComponent) {
    if (creationForm.closeButton) {
      creationForm.closeButton.nativeElement.onclick = this.closeForm.bind(this)
    }

  }

  closeForm() {
    this.showForm = false
  }

  pick() {
    this.showForm = true
  }
}
