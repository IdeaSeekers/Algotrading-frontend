import {Component, ElementRef, Input} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {Chart} from 'highcharts/highstock';
import Accessibility from "highcharts/modules/accessibility";
import Data from "highcharts/modules/data"
import {Observable} from "rxjs";

Accessibility(Highcharts)
Data(Highcharts)

@Component({
  selector: 'return-chart',
  template: `
    <div id="chart-container">
      <highcharts-chart
        [Highcharts]="Highcharts"
        [constructorType]="chartConstructor"
        [options]="chartOptions"
        [callbackFunction]="setChartProxy"
      ></highcharts-chart>
    </div>
  `,
  styles: [`
    #chart-container {
      width: inherit;
      height: inherit;
    }
    highcharts-chart {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class ReturnChartComponent {
  @Input() set dataName(value: string) {
    if (this.chartOptions.series != undefined) {
      this.chartOptions.series[0].name = value;
    }
  };

  @Input() set borderRadius(value: number) {
    this.chartOptions.chart!.borderRadius = value
  }

  @Input() set minimize(value: boolean) {
    if (value) {
      this.chartOptions.chart!.spacingLeft = 0
      this.chartOptions.chart!.spacingRight = 0
      this.chartOptions.xAxis = {
        visible: false,
        crosshair: false
      }
      this.chartOptions.yAxis = {
        visible: false
      }
      this.chartOptions.tooltip = {
        enabled: false
      }
      this.chartOptions.plotOptions!.area!.states = {
        hover: {
          enabled: false
        }
      }
    }
  }

  @Input() set monthButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setMonthView.bind(this)
  }

  @Input() set yearButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setYearView.bind(this)
  }

  @Input() set allButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setAllView.bind(this)
  }

  Highcharts: typeof Highcharts = Highcharts;

  chartConstructor: string = "stockChart";

  chart: Chart | undefined
  maxTime: number = 0
  minTime: number = 0

  constructor() {
    this.setChartProxy = this.setChart.bind(this)
  }

  setChartProxy: (chart: Chart) => void

  updateChartData(observable: Observable<Array<{
    timestamp: number,
    value: number
  }>>) {
    observable.subscribe(data => {
      if (this.chart) {
        this.chart.series[0].setData(data.map(value => [value.timestamp, value.value]))
        this.minTime = this.chart.series[0].xAxis.min!
        this.maxTime = this.chart.series[0].xAxis.max!
      }
    })
  }

  setChart(chart: Chart) {
    this.chart = chart
  }

  private setChartInterval(chart: Chart, newMin: number) {
    if (newMin < this.minTime) {
      newMin = this.minTime
    }
    chart.series[0].xAxis.setExtremes(newMin)
  }

  setMonthView() {
    if (this.chart) {
      const month = 30 * 24 * 3600 * 1000
      this.setChartInterval(this.chart, this.maxTime - month)
    }
  }

  setYearView() {
    if (this.chart) {
      const year = 365 * 24 * 3600 * 1000
      this.setChartInterval(this.chart, this.maxTime - year)
    }
  }

  setAllView() {
    if (this.chart) {
      this.setChartInterval(this.chart, this.minTime)
    }
  }

  chartOptions: Highcharts.Options = {
    chart: {
      panning: {
        enabled: false
      }
    },
    accessibility: {
      enabled: true
    },
    navigator: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Income',
      },
      opposite: false
    },
    tooltip: {
      split: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, 'var(--secondary-color)'],
            [1, 'white']
          ]
        },
      }
    },
    series: [{
      type: 'area',
      pointInterval: 24 * 3600 * 1000,
      name: 'Income'
    }]
  };
}
