import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";

@Component({
  selector: 'strategy-brief',
  template: `
    <div>
      <p>Risk: <span class="{{strategy?.risk}}">{{strategy?.risk}}</span></p>
      <p>Average Return: {{strategy?.averageReturn | number:'1.0-2' | percent}}</p>
      <p>Active Bots: {{strategy?.activeBots}}</p>
    </div>
  `,
  styles: [`
    .Low { color: var(--positive-color); }
    .Medium { color: var(--neutral-color); }
    .High { color: var(--negative-color); }
    p {
      display: inline;
      padding-inline-start: 12px;
      padding-inline-end: 10%;
      font-style: italic;
    }
    div {
      padding-block: 12px;
    }
  `]
})
export class StrategyBriefComponent {

  @Input() strategy: Strategy | undefined;

}
