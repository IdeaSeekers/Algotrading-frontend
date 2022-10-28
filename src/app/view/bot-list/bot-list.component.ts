import {Component} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {BackendService} from "../../control/backend.service";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent {

  bots: Array<Bot>

  constructor(private backend: BackendService) {
    this.bots = backend.getListBots()
  }
}
