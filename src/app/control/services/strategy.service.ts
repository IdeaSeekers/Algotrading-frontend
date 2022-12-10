import {Injectable} from "@angular/core";
import {BackendService} from "./backend.service";
import {map, Observable} from "rxjs";
import {Strategy} from "../../model/strategy.model";
import {StrategyRisk} from "../../model/strategy-risk.model";
import {Parameter} from "../../model/parameter.model";

interface StrategiesId {
  strategies: Array<{
    id: number
  }>
}

interface StrategyById {
  name: string,
  description: string,
  risk: 'low' | 'medium' | 'high',
  parameters: Array<{
    id: number
  }>
}

interface GetActiveBots {
  bots: {
    count: number
  }
}

interface GetAverageReturn {
  average_return: number
}

interface GetHistoryAverageReturn {
  return_history: Array<{
    timestamp: number,
    average_return: number
  }>
}

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  constructor(private backend: BackendService) {
  }

  getStrategiesId(): Observable<Array<number>> {
    let target: Observable<StrategiesId>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate('getStrategiesId', () => {
          return {
            strategies: [0, 1, 2, 3, 4, 5, 6, 7].map((value) => {
              return {
                id: value
              }
            })
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<StrategiesId>(`${this.backend.apiUrl}/strategy`)
    }
    return target.pipe(map((value) => value.strategies.map(item => item.id)))
  }

  getStrategyById(args: { id: number }): Observable<Strategy> {
    let target: Observable<StrategyById>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getStrategyById${args.id}`, () => {
          let description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at nisi est. Praesent quis scelerisque purus. Aliquam non purus eget ante fringilla tincidunt sed sed metus. Morbi varius nec quam ac faucibus. Cras id aliquet metus. Maecenas nec dui nisi. Etiam elementum quam in quam lobortis, eu imperdiet augue ultricies. Quisque nec felis eget enim luctus aliquam at nec ex. Phasellus rhoncus dui vel libero iaculis, quis condimentum mauris pellentesque. Ut maximus enim massa, a venenatis ante euismod nec. Fusce id imperdiet sem.

Nullam vitae lacinia metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus a viverra ligula, id venenatis metus. Proin eget nisl vitae orci luctus convallis. Integer turpis nunc, mollis in aliquam nec, tristique vel lorem. `

          let ret = Math.random()
          let risk: string
          if (ret < 0.3) {
            risk = "low"
          } else if (ret < 0.6) {
            risk = "medium"
          } else {
            risk = "high"
          }

          return {
            name: "Strategy Name " + (args.id + 1).toString(),
            description: description,
            risk: risk,
            parameters: [0, 1].map((value) => {
              return {
                id: value
              }
            })
          }
        })

        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<StrategyById>(`${this.backend.apiUrl}/strategy/${args.id}`)
    }
    return target.pipe(map((value) => {
      let result = new Strategy()
      result.id = args.id
      result.name = value.name
      result.description = value.description
      switch (value.risk) {
        case "low":
          result.risk = StrategyRisk.Low
          break
        case "medium":
          result.risk = StrategyRisk.Medium
          break
        case "high":
          result.risk = StrategyRisk.High
          break
      }

      result.parameters = value.parameters.map(param => {
        let param_result = new Parameter()
        param_result.id = param.id
        return param_result
      })

      return result
    }))
  }

  getNumberOfActiveBots(args: { id: number }): Observable<number> {
    let target: Observable<GetActiveBots>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getNumberOfActiveBots${args.id}`, () => {
          return {
            bots: {
              count: Math.floor(10 + Math.random() * 90)
            }
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<GetActiveBots>(`${this.backend.apiUrl}/strategy/${args.id}/active`)
    }
    return target.pipe(map(value => value.bots.count))
  }

  getAverageStrategyReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }): Observable<number> {
    let target: Observable<GetAverageReturn>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getAverageStrategyReturn${args.id}`, () => {
          return {
            average_return: Math.random() * 2
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      let query = ""
      if (args.from != undefined) {
        query += `?timestamp_from=${args.from}`
      }
      if (args.to != undefined) {
        if (query.length == 0) {
          query += '?'
        } else {
          query += '&'
        }
        query += `timestamp_to=${args.to}`
      }
      target = this.backend.http.get<GetAverageReturn>(`${this.backend.apiUrl}/strategy/${args.id}/average_return${query}`)
    }
    return target.pipe(map(value => value.average_return))
  }

  getStrategyReturnHistory(args: { id: number }): Observable<GetHistoryAverageReturn> {
    if (this.backend.shouldMock) {
      return new Observable(subscriber => {
        let key = `getStrategyReturnHistory${args.id}`
        if (this.backend.mockBuffer[key]) {
          subscriber.next(this.backend.mockBuffer[key])
          subscriber.complete()
          return
        }
        let mockBuf = this.backend.mockBuffer
        let data = this.backend.http.get<Array<Array<number>>>('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
        data.subscribe({
          next(value) {
            let prev = Math.random()
            let ret = {
              return_history: value.map((item, index) => {
                if (index % 500 == 0) {
                  prev = Math.random()
                }
                return {
                  timestamp: item[0],
                  average_return: item[1] * (prev * 0.4 + 0.5)
                }
              })
            }
            mockBuf[key] = ret
            subscriber.next(ret)
          },
          complete() {
            subscriber.complete()
          }
        })
      })
    } else {
      return this.backend.http.get<GetHistoryAverageReturn>(`${this.backend.apiUrl}/strategy/${args.id}/return_history`)
    }
  }
}
