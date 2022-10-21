import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {Chart} from 'highcharts/highstock';
import Accessibility from "highcharts/modules/accessibility";
import Data from "highcharts/modules/data"

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
    highcharts-chart {
      width: inherit;
      height: inherit;
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

  @Input() set monthButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setMonthView.bind(this)
  }

  @Input() set yearButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setYearView.bind(this)
  }

  @Input() set allButton(value: ElementRef<HTMLButtonElement>) {
    value.nativeElement.onclick = this.setAllView.bind(this)
  }

  @ViewChild('chart-container') chartContainer: ElementRef<HTMLDivElement> | undefined

  Highcharts: typeof Highcharts = Highcharts;

  chartConstructor: string = "stockChart";

  chart: Chart | undefined
  maxTime: number = 0
  minTime: number = 0

  constructor() {
    this.setChartProxy = this.setChart.bind(this)
  }

  setChartProxy: (chart: Chart) => void

  setChart(chart: Chart) {
    this.chart = chart
    Highcharts.getJSON(
      'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json',
      (data: Array<Array<any>>) => {
        chart.series[0].setData(data)
        this.minTime = chart.series[0].xAxis.min!
        this.maxTime = chart.series[0].xAxis.max!
      })
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
