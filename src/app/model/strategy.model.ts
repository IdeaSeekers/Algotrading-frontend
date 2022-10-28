import {StrategyRisk} from "./strategy-risk.model";

export class Strategy {
  name: string = "Strategy name";

  // some summary information
  risk: StrategyRisk = StrategyRisk.Low;
  averageReturn: number = 0;
  activeBots: number = 0;

  // descriptions
  description: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at nisi est. Praesent quis scelerisque purus. Aliquam non purus eget ante fringilla tincidunt sed sed metus. Morbi varius nec quam ac faucibus. Cras id aliquet metus. Maecenas nec dui nisi. Etiam elementum quam in quam lobortis, eu imperdiet augue ultricies. Quisque nec felis eget enim luctus aliquam at nec ex. Phasellus rhoncus dui vel libero iaculis, quis condimentum mauris pellentesque. Ut maximus enim massa, a venenatis ante euismod nec. Fusce id imperdiet sem.

Nullam vitae lacinia metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus a viverra ligula, id venenatis metus. Proin eget nisl vitae orci luctus convallis. Integer turpis nunc, mollis in aliquam nec, tristique vel lorem. `;

}
