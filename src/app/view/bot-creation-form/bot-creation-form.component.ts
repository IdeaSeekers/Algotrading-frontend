import {Component, Input} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {User} from "../../model/user.model";

@Component({
  selector: 'bot-creation-form',
  templateUrl: './bot-creation-form.component.html',
  styleUrls: ['./bot-creation-form.component.css']
})
export class BotCreationFormComponent {

  @Input() strategy: Strategy = new Strategy();
  @Input() user: User = new User();

}
