import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Parameter} from "../../model/parameter.model";

@Component({
  selector: 'parameters-table',
  encapsulation: ViewEncapsulation.ShadowDom,
  template: `
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/w3-css/4.1.0/w3.min.css'
          integrity='sha512-Z6UIAdEZ7JNzeX5M/c5QZj+oqbldGD+E8xJEoOwAx5e0phH7kdjsWULGeK5l2UjehKtChHDaUY2rQAF/NEiI9w=='
          crossorigin='anonymous'/>
    <div class="w3-row">
      <div class="table-container">
        <table class="w3-table w3-bordered">
          <thead>
          <tr class="w3-light-grey">
            <th *ngFor="let x of tableData.headers">
              {{ x.key }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let row of tableData.data">
            <td *ngFor="let h of tableData.headers">
              {{ row[h.key] }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .table-container {
      padding-top: 24px;
      padding-bottom: 48px;
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }

    thead {
      position: sticky;
      top: 0;
      background-color: white;
    }

    th {
      text-align: center;
    }

    td:first-child {
      width: 25%;
    }

    td:nth-child(3) {
      width: 10%;
    }
  `]
})
export class ParametersTableComponent {

  @Input() parameters: Parameter[] | undefined;
  @Input() showValues: boolean | undefined;
  allHeaders: ITableHeader[] = [];
  tableData: IDynamicTable = {headers: [], data: []};

  public constructor() {
    if (this.parameters == undefined)
      this.parameters = [];
    if (this.showValues == undefined)
      this.showValues = false;
  }

  ngOnInit() {
    this.allHeaders = this.getHeaders();
    this.tableData = {
      headers: this.allHeaders.filter(x => x.isSelected),
      data: this.getData()
    };
  }

  private getHeaders(): ITableHeader[] {
    return [
      {key: "Name", index: 0, isSelected: true},
      {key: "Description", index: 1, isSelected: true},
      {key: "Value", index: 2, isSelected: this.showValues!!},
    ];
  }

  private getData(): { [name: string]: number | undefined }[] {
    let data: {}[] = [];
    for (let p of this.parameters!!) {
      data.push({
        "Name": p.name,
        "Description": p.description,
        "Value": p.value,
      });
    }
    return data;
  }
}

interface ITableHeader {
  key: string;
  index: number;
  isSelected: boolean;
}

interface IDynamicTable {
  headers: ITableHeader[];
  data: { [name: string]: number | undefined }[];
}
