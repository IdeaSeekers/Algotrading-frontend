import {StrategyRisk} from "./strategy-risk.model";

export class Strategy {
  name: string = "Strategy name";

  // some summary information
  risk: StrategyRisk = StrategyRisk.Low;
  averageReturn: number = 0;
  activeBots: number = 0;

  // descriptions
  description: string = "Full Description";
  briefDescription: string = "Brief Description";

}
