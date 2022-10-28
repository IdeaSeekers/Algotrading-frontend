import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    return this.http
      .get<Array<any>>('http://localhost:8080/bots')
    // let bots = []
    // for (let i = 0; i < 8; i++) {
    //   let bot = new Bot()
    //
    //   bot.name = "Bot Name " + (i + 1).toString()
    //   bot.inputAmount = Math.random() * 1000
    //   bot.currentBalance = Math.random() * 1000
    //   bot.absoluteIncome = bot.currentBalance - bot.inputAmount
    //   bot.relativeIncome = bot.absoluteIncome / bot.inputAmount
    //
    //   bots.push(bot)
    // }
    // return bots
  }
}
