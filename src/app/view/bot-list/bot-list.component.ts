import {Component, OnDestroy, OnInit} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {BackendService} from "../../control/backend.service";
import {IdList} from "../../model/id-list.model";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent implements OnInit, OnDestroy {

  bots: Array<Bot> = []
  private interval: NodeJS.Timer | undefined

  private data: IdList<Bot>

  constructor(private backend: BackendService) {
    this.data = new IdList(
      backend.getBotsId.bind(backend),
      (id: number) => backend.getBotById({id: id})
    )
  }

  private loadBots() {
    this.bots = []
    this.data.getFreshData().subscribe(([_, bot]) => {
      // TODO: change it
      if (environment.mockBackend) {
        bot.currentBalance *= Math.random() * 2
      }

      bot.inputAmount = bot.parameters.find((value) => value.id == 0)!.value!
      this.bots.push(bot)
      this.bots.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        } else if (a.name == b.name) {
          return 0
        } else {
          return 1
        }
      })
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
