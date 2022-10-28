import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bot} from "../model/bot.model";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }

  createBot(botName: string, rubles: number) {
    return this.http.post('http://localhost:8080/product', {
      name: botName,
      rubles: rubles
    })
  }

  getListBots() {
    let bots = []
    for (let i = 0; i < 8; i++) {
      let bot = new Bot()

      bot.name = "Bot Name " + (i + 1).toString()
      bot.inputAmount = Math.random() * 1000
      bot.currentBalance = Math.random() * 1000
      bot.absoluteIncome = bot.currentBalance - bot.inputAmount
      bot.relativeIncome = bot.absoluteIncome / bot.inputAmount

      bots.push(bot)
    }
    return bots
  }
}
