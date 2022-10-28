import {AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild} from "@angular/core";
import {Strategy} from "../../model/strategy.model";
import {Title} from "@angular/platform-browser";
import {StrategyRisk} from "../../model/strategy-risk.model";
import {BotCreationFormComponent} from "../bot-creation-form/bot-creation-form.component";

@Component({
  selector: 'strategy-description',
  templateUrl: './strategy-description.component.html',
  styleUrls: ['strategy-description.component.css']
})
export class StrategyDescriptionComponent implements AfterViewInit {

  @Input() strategy: Strategy;

  @ViewChild('creationForm', { static: false }) set creationForm(value: BotCreationFormComponent | undefined) {
    if (value) {
      this.onCreationFormOpen(value)
    }
  }

  showForm: boolean = false
  isInitialised: boolean = false

  ngAfterViewInit() {
    this.isInitialised = true
    this.cdr.detectChanges()
  }

  constructor(private titleService: Title, private cdr: ChangeDetectorRef) {
    this.strategy = new Strategy()
    this.strategy.name = "Strategy Name";
    this.strategy.risk = StrategyRisk.Low;
    this.strategy.activeBots = 512;
    this.strategy.averageReturn = 0.06;

    this.titleService.setTitle(this.strategy.name);
  }

  onCreationFormOpen(creationForm: BotCreationFormComponent) {
    if (creationForm.closeButton) {
      creationForm.closeButton.nativeElement.onclick = this.closeForm.bind(this)
    }

  }

  closeForm() {
    this.showForm = false
  }

  pick() {
    this.showForm = true
  }
}
