import {Component, Input} from "@angular/core";
import {Bot} from "../../model/bot.model";

@Component({
  selector: 'bot-info',
  template: `
    <div>
      <p class="left"><span class="info-title">Current Balance</span>:<br/>{{bot.currentBalance | number:'1.0-2'}}₽</p>
      <p class="right"><span class="info-title">Status</span>:<br/><span class="{{bot.getStatusLevel()}}">{{bot.status}}</span></p>
      <p class="left"><span class="info-title">Income</span>:<br/><span class="{{bot.getRelativeIncomeStatus()}}">
        {{bot.absoluteIncome | number:'1.0-2'}}₽ ({{bot.relativeIncome | number:'1.0-4' | percent}})
      </span></p>
      <p class="right"><span class="info-title">Strategy</span>:<br/>{{bot.strategy.name}}</p>
    </div>
  `,
  styles: [`
    .positive { color: var(--positive-color); }
    .neutral { color: var(--neutral-color); }
    .negative { color: var(--negative-color); }

    .info-title {
      font-weight: bolder;
      font-style: normal;
    }

    p {
      font-style: italic;
    }

    /*.left {*/
    /*  text-align: left;*/
    /*}*/

    /*.right {*/
    /*  text-align: right;*/
    /*}*/

    div {
      width: inherit;
      padding: inherit;
      margin: inherit;

      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  `]
})
export class BotInfoComponent {

  @Input() bot!: Bot;

}
