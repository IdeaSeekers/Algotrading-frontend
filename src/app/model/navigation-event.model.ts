import {Type} from "@angular/core";

export class NavigationEventModel {
  constructor(public component: Type<any>, public init: ((component: any) => void) | undefined) {
  }
}
