import {Component, OnDestroy, OnInit} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {BackendService} from "../../control/backend.service";

@Component({
  selector: 'bot-list',
  templateUrl: './bot-list.component.html',
  styleUrls: ['./bot-list.component.css']
})
export class BotListComponent implements OnInit, OnDestroy {

  bots: Array<Bot> = []
  private interval: NodeJS.Timer | undefined

  constructor(private backend: BackendService) {
  }

  ngOnInit(): void {
    // this.interval = setInterval(() => {
    // }, 500)
  }

  ngOnDestroy() {
    // clearInterval(this.interval)
  }
}
