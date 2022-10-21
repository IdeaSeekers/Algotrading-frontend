import {AfterViewInit, ChangeDetectorRef, Component, Input} from "@angular/core";
import {Strategy} from "../../model/strategy.model";
import {Title} from "@angular/platform-browser";
import {StrategyRisk} from "../../model/strategy-risk.model";

@Component({
  selector: 'strategy-description',
  templateUrl: './strategy-description.component.html',
  styleUrls: ['strategy-description.component.css']
})
export class StrategyDescriptionComponent implements AfterViewInit {

  @Input() strategy: Strategy = new Strategy();

  isInitialised: boolean = false

  ngAfterViewInit() {
    this.isInitialised = true
    this.cdr.detectChanges()
  }

  constructor(private titleService: Title, private cdr: ChangeDetectorRef) {
    this.strategy.name = "Strategy Name";
    this.strategy.risk = StrategyRisk.Low;
    this.strategy.activeBots = 512;
    this.strategy.averageReturn = 0.06;
    this.strategy.description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at nisi est. Praesent quis scelerisque purus. Aliquam non purus eget ante fringilla tincidunt sed sed metus. Morbi varius nec quam ac faucibus. Cras id aliquet metus. Maecenas nec dui nisi. Etiam elementum quam in quam lobortis, eu imperdiet augue ultricies. Quisque nec felis eget enim luctus aliquam at nec ex. Phasellus rhoncus dui vel libero iaculis, quis condimentum mauris pellentesque. Ut maximus enim massa, a venenatis ante euismod nec. Fusce id imperdiet sem.

Nullam vitae lacinia metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus a viverra ligula, id venenatis metus. Proin eget nisl vitae orci luctus convallis. Integer turpis nunc, mollis in aliquam nec, tristique vel lorem. `;

    this.titleService.setTitle(this.strategy.name);
  }

  pick() {

  }
}
