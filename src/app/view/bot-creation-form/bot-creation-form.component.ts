import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Strategy} from "../../model/strategy.model";
import {User} from "../../model/user.model";
import {UserService} from "../../control/services/user.service";
import {BotsService} from "../../control/services/bots.service";

@Component({
  selector: 'bot-creation-form',
  templateUrl: './bot-creation-form.component.html',
  styleUrls: ['./bot-creation-form.component.css']
})
export class BotCreationFormComponent implements OnInit {

  @Input() strategy!: Strategy;
  user!: User;
  @Input() onSendRequest: (() => void) | undefined

  @ViewChild('close_button') closeButton!: ElementRef<HTMLButtonElement>
  @ViewChild('start_button') startButton!: ElementRef<HTMLButtonElement>

  botCreationForm = this.fb.group({
    botName: ['', Validators.required],
    inputAmount: [0, [Validators.min(10), Validators.max(1000000)]],
    terms: [false, Validators.requiredTrue],
  })

  ngOnInit() {
    this.user = this.userService.getUser()!
  }

  constructor(private fb: FormBuilder, private botsService: BotsService, private userService: UserService) {
    this.sendRequestProvider = this.sendRequest.bind(this)
  }

  sendRequestProvider: () => void

  private sendRequest() {
    this.botsService.createBot({
      name: this.botCreationForm.value.botName!,
      strategy: {
        id: this.strategy.id
      },
      parameters: [
        {
          id: 0,
          value: 0
        },
        {
          id: 1,
          value: this.botCreationForm.value.inputAmount!
        }
      ]
    }).subscribe()
    if (this.onSendRequest) {
      this.onSendRequest()
    }
  }

}
