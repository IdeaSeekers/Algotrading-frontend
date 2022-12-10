import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ParametersTableComponent} from "../view/parameters-table/parameters-table.component";


@NgModule({
  declarations: [
    ParametersTableComponent
  ],
  exports: [
    ParametersTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ParametersTableModule {
}
