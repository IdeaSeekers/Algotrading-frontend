import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Strategy} from "../../model/strategy.model";
import {User} from "../../model/user.model";
import {BackendService} from "../../control/services/backend.service";

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

  botCreationForm = this.fb.group({
    botName: ['', Validators.required],
    rubles: [0, [Validators.min(10), Validators.max(1000000)]],
    terms: [false, Validators.requiredTrue],
  })

  constructor(private fb: FormBuilder, private backend: BackendService) {
    this.user = new User()
    this.user.balance = 1000000
    this.sendRequestProvider = this.sendRequest.bind(this)
  }

  sendRequestProvider: () => void

  private sendRequest() {
    console.warn(this.botCreationForm.value)
    // this.backend.createBot(this.botName, this.rubles)
    //   .subscribe()
    if (this.onSendRequest) {
      this.onSendRequest()
    }
  }

}
