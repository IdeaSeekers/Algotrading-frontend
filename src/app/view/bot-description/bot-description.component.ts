import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {Title} from "@angular/platform-browser";
import {BotStatus} from "../../model/bot-status.model";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {map} from "rxjs";
import {NavigationService} from "../../control/services/navigation.service";
import {Parameter} from "../../model/parameter.model";
import {BotsService} from "../../control/services/bots.service";

@Component({
  selector: 'bot-description',
  templateUrl: './bot-description.component.html',
  styleUrls: ['bot-description.component.css']
})
export class BotDescriptionComponent implements AfterViewInit, OnDestroy {

  @Input() bot: Bot;

  @ViewChild('chart') chart!: ReturnChartComponent

  isInitialised: boolean = false
  parameters: Parameter[] = []

  ngAfterViewInit() {
    this.isInitialised = true
    this.parameters = [
      {id: 0, name: "Test par 1", description: "Test description", value: 1},
      {id: 1, name: "Test par 2", description: "Test description", value: 2},
    ]
    this.cdr.detectChanges()
    this.chart.updateChartData(
      this.botsService
        .getBotOperationsHistory({id: this.bot.id})
        .pipe(map(value =>
          value.operations.map(item => {
            return {
              timestamp: item.timestamp,
              value: item.return
            }
          })
        ))
    )
  }

  private readonly oldTitle: string

  constructor(
    private titleService: Title,
    private cdr: ChangeDetectorRef,
    private botsService: BotsService,
    private navigation: NavigationService
  ) {
    this.bot = new Bot()
    this.bot.name = "Bot Name";
    this.bot.inputAmount = 1000;
    this.bot.currentBalance = 1100;
    this.bot.status = BotStatus.Running

    this.oldTitle = this.titleService.getTitle()
    this.titleService.setTitle(this.bot.name);
  }

  stopBot() {
    this.botsService.stopBot({id: this.bot.id}).subscribe()
    this.navigation.loadBack()
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.oldTitle)
  }
}
