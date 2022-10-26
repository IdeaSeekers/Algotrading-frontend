import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";

@Component({
  selector: 'strategy-brief',
  template: `
    <div>
      <p class="left">Risk: <span class="{{strategy.risk}}">{{strategy.risk}}</span></p>
      <p class="middle">Average Return: {{strategy.averageReturn | number:'1.0-2' | percent}}</p>
      <p class="right">Active Bots: {{strategy.activeBots}}</p>
    </div>
  `,
  styles: [`
    .Low { color: var(--positive-color); }
    .Medium { color: var(--neutral-color); }
    .High { color: var(--negative-color); }
    p {
      font-style: italic;
    }
    div {
      width: inherit;
      padding: inherit;
      margin: inherit;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
    .left {
      text-align: left;
    }
    .middle {
      text-align: center;
    }
    .right {
      text-align: right;
    }
  `]
})
export class StrategyBriefComponent {

  @Input() strategy!: Strategy;

}
