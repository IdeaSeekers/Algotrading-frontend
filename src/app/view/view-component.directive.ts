import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[viewComponentHost]'
})
export class ViewComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
