import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Strategy} from "../../model/strategy.model";
import {StrategyRisk} from "../../model/strategy-risk.model";
import {Parameter} from "../../model/parameter.model";
import {Bot} from "../../model/bot.model";
import {BotStatus} from "../../model/bot-status.model";

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

interface ParameterById {
  name: string,
  description: string,
  type: 'int' | 'float',
  min?: number,
  max?: number
}

interface BotsId {
  bots: Array<{
    id: number
  }>
}

interface BotById {
  name: string,
  strategyId: number,
  balance: number,
  security: string,
  status: 'running' | 'paused' | 'stopped' | 'unknown',
  parameters: Array<{
    id: number,
    value: number
  }>
}

interface CreateBot {
  bot: number
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

interface GetReturn {
  return: number
}

interface GetOperations {
  operations: Array<{
    type: 'buy' | 'cell',
    timestamp: number,
    executed_price: number,
    return: number
  }>
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl: string
  shouldMock: boolean
  private mockBuffer: { [k: string]: any } = {};

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl
    this.shouldMock = environment.mockBackend
  }

  private getOrCreate(key: string, def: () => any): any {
    if (this.mockBuffer[key] == undefined) {
      this.mockBuffer[key] = def()
    }
    return this.mockBuffer[key]
  }

  getStrategiesId(): Observable<Array<number>> {
    let target: Observable<StrategiesId>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate('getStrategiesId', () => {
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
      target = this.http.get<StrategiesId>(`${this.apiUrl}/strategy`)
    }
    return target.pipe(map((value) => value.strategies.map(item => item.id)))
  }

  getStrategyById(args: { id: number }): Observable<Strategy> {
    let target: Observable<StrategyById>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getStrategyById${args.id}`, () => {
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
            parameters: [0, 1, 2].map((value) => {
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
      target = this.http.get<StrategyById>(`${this.apiUrl}/strategy/${args.id}`)
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

      result.averageReturn = 0
      result.activeBots = 0

      result.parameters = value.parameters.map(param => {
        let param_result = new Parameter()
        param_result.id = param.id
        return param_result
      })

      return result
    }))
  }

  getParameterById(args: { id: number }): Observable<Parameter> {
    let target: Observable<ParameterById>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getParameterById${args.id}`, () => {
          switch (args.id) {
            case 0:
              return {
                name: 'initial amount',
                description: 'some description',
                type: 'float',
                min: 0,
                max: 1000000
              }
            case 1:
              return {
                name: 'lower bound',
                description: 'some description',
                type: 'float'
              }
            default:
              return {
                name: 'upper bound',
                description: 'some description',
                type: 'float'
              }
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.http.get<ParameterById>(`${this.apiUrl}/parameter/${args.id}`)
    }
    return target.pipe(map((value) => {
      let result = new Parameter()
      result.id = args.id
      result.name = value.name
      result.description = value.description
      result.min = value.min
      result.max = value.max
      return result
    }))
  }

  getBotsId(): Observable<Array<number>> {
    let target: Observable<BotsId>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate('getBotsId', () => {
          return {
            bots: [0, 1, 2, 3, 4, 5, 6, 7, 8].map((value) => {
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
      target = this.http.get<BotsId>(`${this.apiUrl}/bot`)
    }
    return target.pipe(map(value => value.bots.map(item => item.id)))
  }

  getBotById(args: { id: number }): Observable<Bot> {
    let target: Observable<BotById>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getBotById${args.id}`, () => {
          let name = "Bot Name " + (args.id + 1).toString()
          let inputAmount = Math.random() * 1000
          let currentBalance = Math.random() * 1000
          return {
            name: name,
            strategyId: 0,
            balance: currentBalance,
            security: 'rub',
            status: 'running',
            parameters: [
              {
                id: 0,
                value: inputAmount
              },
              {
                id: 1,
                value: 10
              },
              {
                id: 2,
                value: 100000
              }
            ]
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.http.get<BotById>(`${this.apiUrl}/bot/${args.id}`)
    }
    return target.pipe(map(value => {
      let result = new Bot()
      result.id = args.id
      result.name = value.name
      result.currentBalance = value.balance
      result.parameters = value.parameters.map(param => {
        let param_model = new Parameter()
        param_model.id = param.id
        param_model.value = param.value
        return param_model
      })
      result.strategy = new Strategy()
      result.strategy.id = value.strategyId
      switch (value.status) {
        case "paused":
          result.status = BotStatus.Paused
          break
        case "running":
          result.status = BotStatus.Running
          break
        case "stopped":
          result.status = BotStatus.Stopped
          break
        case "unknown":
          result.status = BotStatus.Unknown
          break
      }
      return result
    }))
  }

  createBot(args: {
    name: string,
    strategy: {
      id: number
    },
    initial_balance: number,
    security: string,
    parameters: Array<{
      id: number,
      value: number
    }>
  }): Observable<number> {
    let target: Observable<CreateBot>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        subscriber.next({
          bot: 0
        })
        subscriber.complete();
      })
    } else {
      target = this.http.post<CreateBot>(`${this.apiUrl}/bot`, args)
    }
    return target.pipe(map(value => value.bot))
  }

  stopBot(args: { id: number }): Observable<{}> {
    if (this.shouldMock) {
      return new Observable(subscriber => {
        subscriber.complete()
      })
    } else {
      return this.http.delete(`${this.apiUrl}/bot/${args.id}`)
    }
  }

  changeStatus(args: {
    id: number,
    status: 'running' | 'paused'
  }): Observable<{}> {
    if (this.shouldMock) {
      return new Observable(subscriber => {
        subscriber.complete()
      })
    } else {
      return this.http.put(`${this.apiUrl}/bot/${args.id}`, {
        status: args.status
      })
    }
  }

  getNumberOfActiveBots(args: { id: number }): Observable<number> {
    let target: Observable<GetActiveBots>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getNumberOfActiveBots${args.id}`, () => {
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
      target = this.http.get<GetActiveBots>(`${this.apiUrl}/strategy/${args.id}/active`)
    }
    return target.pipe(map(value => value.bots.count))
  }

  getAverageStrategyReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }): Observable<number> {
    let target: Observable<GetAverageReturn>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getAverageStrategyReturn${args.id}`, () => {
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
      target = this.http.get<GetAverageReturn>(`${this.apiUrl}/strategy/${args.id}/average_return${query}`)
    }
    return target.pipe(map(value => value.average_return))
  }

  getStrategyReturnHistory(args: { id: number }): Observable<GetHistoryAverageReturn> {
    if (this.shouldMock) {
      return new Observable(subscriber => {
        let key = `getStrategyReturnHistory${args.id}`
        if (this.mockBuffer[key]) {
          subscriber.next(this.mockBuffer[key])
          subscriber.complete()
          return
        }
        let mockBuf = this.mockBuffer
        let data = this.http.get<Array<Array<number>>>('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
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
      return this.http.get<GetHistoryAverageReturn>(`${this.apiUrl}/strategy/${args.id}/return_history`)
    }
  }

  getBotReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }): Observable<number> {
    let target: Observable<GetReturn>
    if (this.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.getOrCreate(`getBotReturn${args.id}`, () => {
          return {
            return: Math.random() * 1000 - 500
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
      target = this.http.get<GetReturn>(`${this.apiUrl}/bot/${args.id}/average_return${query}`)
    }
    return target.pipe(map(value => value.return))
  }

  getBotOperationsHistory(args: { id: number }): Observable<GetOperations> {
    if (this.shouldMock) {
      return new Observable(subscriber => {
        let key = `getBotOperationsHistory${args.id}`
        if (this.mockBuffer[key]) {
          subscriber.next(this.mockBuffer[key])
          subscriber.complete()
          return
        }
        let mockBuf = this.mockBuffer
        let data = this.http.get<Array<Array<number>>>('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
        data.subscribe({
          next(value) {
            let prev = Math.random()
            let ret: GetOperations = {
              operations: value.map((item, index) => {
                if (index % 1000 == 0) {
                  prev = Math.random()
                }
                return {
                  type: 'buy',
                  timestamp: item[0],
                  executed_price: Math.random() * item[1],
                  return: item[1] * (prev * 0.4 + 0.5)
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
      return this.http.get<GetOperations>(`${this.apiUrl}/bot/${args.id}/operations`)
    }
  }

}
