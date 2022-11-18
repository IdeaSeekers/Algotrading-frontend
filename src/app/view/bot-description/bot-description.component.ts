import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {Title} from "@angular/platform-browser";
import {BotStatus} from "../../model/bot-status.model";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {BackendService} from "../../control/services/backend.service";
import {map} from "rxjs";

@Component({
  selector: 'bot-description',
  templateUrl: './bot-description.component.html',
  styleUrls: ['bot-description.component.css']
})
export class BotDescriptionComponent implements AfterViewInit, OnDestroy {

  @Input() bot: Bot;

  @ViewChild('chart') chart!: ReturnChartComponent

  isInitialised: boolean = false

  ngAfterViewInit() {
    this.isInitialised = true
    this.cdr.detectChanges()
    this.chart.updateChartData(
      this.backend
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

  constructor(private titleService: Title, private cdr: ChangeDetectorRef, private backend: BackendService) {
    this.bot = new Bot()
    this.bot.name = "Bot Name";
    this.bot.inputAmount = 1000;
    this.bot.currentBalance = 1100;
    this.bot.status = BotStatus.Running

    this.oldTitle = this.titleService.getTitle()
    this.titleService.setTitle(this.bot.name);
  }

  ngOnDestroy() {
    this.titleService.setTitle(this.oldTitle)
  }

  updateStatus() {
  }
}
