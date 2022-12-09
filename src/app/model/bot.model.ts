import {Parameter} from "./parameter.model";
import {BotStatus} from "./bot-status.model";
import {Strategy} from "./strategy.model";

export class Bot {
  id: number = 0
  name: string = "Bot name";
  strategy: Strategy = new Strategy()

  parameters: Array<Parameter> = []

  currentBalance: number = 0;
  status: BotStatus = BotStatus.Unknown

  inputAmount: number = 0;

  public get absoluteIncome(): number {
    return this.currentBalance - this.inputAmount
  }
  public get relativeIncome(): number {
    return this.absoluteIncome / this.inputAmount
  }

  getRelativeIncomeStatus(): string {
    if (this.relativeIncome > 0) {
      return "positive";
    } else if (this.relativeIncome < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  }

  getStatusLevel(): string {
    switch (this.status) {
      case BotStatus.Running:
        return "positive";
      case BotStatus.Paused:
        return "neutral";
      case BotStatus.Stopped:
        return "negative";
      case BotStatus.Unknown:
        return "negative"
    }
  }
}
