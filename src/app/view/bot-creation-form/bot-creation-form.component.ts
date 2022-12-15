import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Strategy} from "../../model/strategy.model";
import {User} from "../../model/user.model";
import {UserService} from "../../control/services/user.service";
import {BotsService} from "../../control/services/bots.service";
import {ParametersService} from "../../control/services/parameters.service";

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

  botCreationForm!: FormGroup

  ngOnInit() {
    this.user = this.userService.getUser()!
    this.botCreationForm = this.fb.group({
      botName: ['', Validators.required],
      security: [null, Validators.required],
      inputAmount: [0, [Validators.min(10), Validators.max(this.user.balance)]],
      terms: [false, Validators.requiredTrue],
    })
  }

  constructor(
    private fb: FormBuilder,
    private botsService: BotsService,
    private userService: UserService,
    public parameterService: ParametersService
  ) {
    this.sendRequestProvider = this.sendRequest.bind(this)
  }

  sendRequestProvider: () => void

  private sendRequest() {
    console.log(this.botCreationForm.value.security.length)
    this.botsService.createBot({
      name: this.botCreationForm.value.botName!,
      strategy: {
        id: this.strategy.id
      },
      parameters: [
        {
          id: 0,
          value: this.botCreationForm.value.security!.id
        },
        {
          id: 1,
          value: this.botCreationForm.value.inputAmount!
        }
      ]
    }).subscribe().add(() => {
      if (this.onSendRequest) {
        this.onSendRequest()
      }
    })
  }

}
