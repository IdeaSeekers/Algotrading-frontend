import {Component} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {BackendService} from "../../control/backend.service";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent {

  bots: Array<Bot> = []

  constructor(private backend: BackendService) {
    backend.getListBots().subscribe(bots => {
      for (const botInfo of bots) {
        let bot = new Bot()
        bot.name = botInfo["name"]
        bot.inputAmount = botInfo["inputAmount"]
        bot.currentBalance = Math.random() * 1000
        bot.absoluteIncome = bot.currentBalance - bot.inputAmount
        bot.relativeIncome = bot.absoluteIncome / bot.inputAmount
        this.bots.push(bot)
      }
    })
  }
}
