import {AfterViewInit, ChangeDetectorRef, Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";
import {Title} from "@angular/platform-browser";
import {Strategy} from "../../model/strategy.model";

@Component({
  selector: 'bot-description',
  templateUrl: './bot-description.component.html',
  styleUrls: ['bot-description.component.css']
})
export class BotDescriptionComponent implements AfterViewInit {

  @Input() bot: Bot;

  isInitialised: boolean = false

  ngAfterViewInit() {
    this.isInitialised = true
    this.cdr.detectChanges()
  }

  constructor(private titleService: Title, private cdr: ChangeDetectorRef) {
    this.bot = new Bot()
    this.bot.name = "Bot Name";
    this.bot.inputAmount = 1000;
    this.bot.absoluteIncome = 100;
    this.bot.relativeIncome = 0.1;
    this.bot.strategy = new Strategy();

    this.titleService.setTitle(this.bot.name);
  }

  updateStatus() {}
}
