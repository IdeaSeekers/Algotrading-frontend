import {Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent {

  @Input() bots: Array<Bot>

  constructor() {
    this.bots = []
    for (let i = 0; i < 8; i++) {
      let bot = new Bot()

      bot.name = "Bot Name " + (i + 1).toString()
      bot.inputAmount = Math.random() * 1000
      bot.currentBalance = Math.random() * 1000
      bot.absoluteIncome = bot.currentBalance - bot.inputAmount
      bot.relativeIncome = bot.absoluteIncome / bot.inputAmount

      this.bots.push(bot)
    }
  }
}
