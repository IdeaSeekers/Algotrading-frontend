import {Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";

@Component({
  selector: 'bot-info',
  template: `
    <div>
      <div style="display: flex; justify-content: space-between">
        <p style="flex-basis: 30%">Current Balance: {{bot.currentBalance | number:'1.0-2'}}₽</p>
        <p style="flex-basis: 69%">Status: <span class="{{bot.getStatusLevel()}}">{{bot.status}}</span></p>
      </div>
      <div style="display: flex; justify-content: space-between">
        <p style="flex-basis: 30%">Income: <span class="{{bot.getRelativeIncomeStatus()}}">
          {{bot.absoluteIncome | number:'1.0-2'}}₽ ({{bot.relativeIncome | number:'1.0-4' | percent}})
        </span></p>
        <p style="flex-basis: 69%">Strategy: {{bot.strategy.name}}</p>
      </div>
    </div>
  `,
  styles: [`
    .positive { color: var(--positive-color); }
    .neutral { color: var(--neutral-color); }
    .negative { color: var(--negative-color); }

    div {
      width: inherit;
      padding: inherit;
      margin: inherit;
    }
  `]
})
export class BotInfoComponent {

  @Input() bot!: Bot;

}
