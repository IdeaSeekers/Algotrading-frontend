import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {Title} from "@angular/platform-browser";
import {BotStatus} from "../../model/bot-status.model";
import {ReturnChartComponent} from "../return-chart/return-chart.component";
import {map} from "rxjs";
import {NavigationService} from "../../control/services/navigation.service";
import {BotsService} from "../../control/services/bots.service";
import {environment} from "../../../environments/environment";

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
    this.interval = setInterval(() => {
      this.botsService.getBotById({id: this.bot.id}).subscribe(bot => {
        if (environment.mockBackend) {
          bot.currentBalance *= Math.random() * 2
        }
        this.bot.status = bot.status
        this.bot.currentBalance = bot.currentBalance
      })
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
    }, 2000)
  }

  private readonly oldTitle: string
  private interval: NodeJS.Timer | undefined

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
    this.botsService.stopBot({id: this.bot.id}).subscribe().add(() => this.navigation.loadBotsList())
  }

  ngOnDestroy() {
    clearInterval(this.interval)
    this.titleService.setTitle(this.oldTitle)
  }
}
