import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Strategy} from "../../model/strategy.model";
import {User} from "../../model/user.model";
import {BackendService} from "../../control/backend.service";

@Component({
  selector: 'bot-creation-form',
  templateUrl: './bot-creation-form.component.html',
  styleUrls: ['./bot-creation-form.component.css']
})
export class BotCreationFormComponent {

  @Input() strategy!: Strategy;
  @Input() user: User;
  @Input() onSendRequest: (() => void) | undefined

  @ViewChild('close_button') closeButton!: ElementRef<HTMLButtonElement>
  @ViewChild('start_button') startButton!: ElementRef<HTMLButtonElement>

  botName: string = ''
  rubles: number = 0

  constructor(private backend: BackendService) {
    this.user = new User()
    this.user.balance = 1000000
    this.sendRequestProvider = this.sendRequest.bind(this)
  }

  sendRequestProvider: () => void

  private sendRequest() {
    this.backend.createBot(this.botName, this.rubles)
      .subscribe()
    if (this.onSendRequest) {
      this.onSendRequest()
    }
  }

}
