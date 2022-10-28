export class Bot {
  name: string = "Bot name";

  inputAmount: number = 0;
  currentBalance: number = 0;
  absoluteIncome: number = 0;
  relativeIncome: number = 0;

  getRelativeIncomeStatus(): string {
    if (this.relativeIncome > 0) {
      return "positive";
    } else if (this.relativeIncome < 0) {
      return "negative";
    } else {
      return "neutral";
    }
  }
}
