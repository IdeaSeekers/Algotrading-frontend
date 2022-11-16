import {Strategy} from "./strategy.model";

export enum Status {
  Running = "Running",
  Paused = "Paused",
  Stopped = "Stopped",
}

export class Bot {
  name: string = "Bot name";

  inputAmount: number = 1000;
  currentBalance: number = 900;
  absoluteIncome: number = -100;
  relativeIncome: number = -0.1;

  strategy: Strategy = new Strategy();

  status: Status = Status.Running;

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
      case Status.Running:
        return "positive";
      case Status.Paused:
        return "neutral";
      case Status.Stopped:
        return "negative";
    }
  }
}
