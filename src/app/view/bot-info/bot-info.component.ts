import {Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";

@Component({
  selector: 'bot-info',
  template: `
    <div>
      <p>Input Amount: {{bot.inputAmount | number:'1.0-2'}}₽</p>
      <p>Current Balance: {{bot.currentBalance | number:'1.0-2'}}₽</p>
      <p>Income: <span class="{{bot.getRelativeIncomeStatus()}}">
        {{bot.absoluteIncome | number:'1.0-2'}}₽ ({{bot.relativeIncome | number:'1.0-4' | percent}})
      </span></p>
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
