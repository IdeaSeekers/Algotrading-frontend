import {Component, OnDestroy, OnInit} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {IdList} from "../../model/id-list.model";
import {environment} from "../../../environments/environment";
import {BotsService} from "../../control/services/bots.service";
import {StrategyService} from "../../control/services/strategy.service";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent implements OnInit, OnDestroy {

  bots: Array<Bot> = []
  private interval: NodeJS.Timer | undefined

  private data: IdList<Bot>

  constructor(private botsService: BotsService, private strategyService: StrategyService) {
    this.data = new IdList(
      botsService.getBotsId.bind(botsService),
      (id: number) => botsService.getBotById({id: id})
    )
  }

  private loadBots() {
    let newBots: Array<Bot> = []
    let expected = 0
    let actual = 0
    let finished = false
    this.data.getFreshData().subscribe(([_, bot]) => {
      if (environment.mockBackend) {
        bot.currentBalance *= Math.random() * 2
      }

      expected += 1
      bot.inputAmount = bot.parameters.find((value) => value.id == 1)!.value!
      this.strategyService.getStrategyById({id: bot.strategy.id}).subscribe(value => {
        bot.strategy = value
      }).add(() => {
        newBots.push(bot)
        actual += 1
        if (finished && actual >= expected) {
          this.bots = newBots.sort((a, b) => {
            if (a.name < b.name) {
              return -1
            } else if (a.name == b.name) {
              return 0
            } else {
              return 1
            }
          })
        }
      })
    }).add(() => {
      finished = true
      if (finished && actual >= expected) {
        this.bots = newBots.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name == b.name) {
            return 0
          } else {
            return 1
          }
        })
      }
    })
  }

  ngOnInit(): void {
    this.loadBots()
    this.interval = setInterval(() => {
      this.loadBots()
    }, 2000)
  }

  ngOnDestroy() {
    clearInterval(this.interval)
  }
}
