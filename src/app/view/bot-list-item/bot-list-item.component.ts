import {Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {NavigationService} from "../../control/services/navigation.service";

@Component({
  selector: 'bot-list-item',
  templateUrl: './bot-list-item.component.html',
  styleUrls: ['./bot-list-item.component.css']
})
export class BotListItemComponent {
  @Input() bot!: Bot

  constructor(private navigation: NavigationService) {
  }

  navigateToBotDescription() {
    this.navigation.loadBotDescription(this.bot)
  }
}
