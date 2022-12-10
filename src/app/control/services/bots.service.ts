import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Bot} from "../../model/bot.model";
import {Parameter} from "../../model/parameter.model";
import {BotStatus} from "../../model/bot-status.model";
import {BackendService} from "./backend.service";

interface BotsId {
  bots: Array<{
    id: number
  }>
}

interface BotById {
  name: string,
  strategyId: number,
  balance: number,
  status: 'running' | 'paused' | 'stopped' | 'unknown',
  parameters: Array<{
    id: number,
    value: number
  }>
}

interface CreateBotInput {
  name: string,
  strategy: {
    id: number
  },
  parameters: Array<{
    id: number,
    value: number
  }>
}

interface CreateBot {
  bot: number
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
export class BotsService {

  constructor(private backend: BackendService) {
  }

  getBotsId(): Observable<Array<number>> {
    let target: Observable<BotsId>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate('getBotsId', () => {
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
      target = this.backend.http.get<BotsId>(`${this.backend.apiUrl}/bot`)
    }
    return target.pipe(map(value => value.bots.map(item => item.id)))
  }

  getBotById(args: { id: number }): Observable<Bot> {
    let target: Observable<BotById>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getBotById${args.id}`, () => {
          let name = "Bot Name " + (args.id + 1).toString()
          let inputAmount = Math.random() * 1000
          let currentBalance = Math.random() * 1000
          return {
            name: name,
            strategyId: 0,
            balance: currentBalance,
            status: 'running',
            parameters: [
              {
                id: 0,
                value: 0
              },
              {
                id: 1,
                value: inputAmount
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
      target = this.backend.http.get<BotById>(`${this.backend.apiUrl}/bot/${args.id}`)
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
      result.strategy.id = value.strategyId
      result.inputAmount = result.parameters.find(x => x.id == 1)!.value!
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

  createBot(args: CreateBotInput): Observable<number> {
    let target: Observable<CreateBot>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        subscriber.next({
          bot: 0
        })
        subscriber.complete();
      })
    } else {
      target = this.backend.http.post<CreateBot>(`${this.backend.apiUrl}/bot`, args)
    }
    return target.pipe(map(value => value.bot))
  }

  stopBot(args: { id: number }): Observable<{}> {
    if (this.backend.shouldMock) {
      return new Observable(subscriber => {
        subscriber.complete()
      })
    } else {
      return this.backend.http.delete(`${this.backend.apiUrl}/bot/${args.id}`)
    }
  }

  changeStatus(args: {
    id: number,
    status: 'running' | 'paused'
  }): Observable<{}> {
    if (this.backend.shouldMock) {
      return new Observable(subscriber => {
        subscriber.complete()
      })
    } else {
      return this.backend.http.put(`${this.backend.apiUrl}/bot/${args.id}`, {
        status: args.status
      })
    }
  }

  getBotReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }): Observable<number> {
    let target: Observable<GetReturn>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getBotReturn${args.id}`, () => {
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
      target = this.backend.http.get<GetReturn>(`${this.backend.apiUrl}/bot/${args.id}/average_return${query}`)
    }
    return target.pipe(map(value => value.return))
  }

  getBotOperationsHistory(args: { id: number }): Observable<GetOperations> {
    if (this.backend.shouldMock) {
      return new Observable(subscriber => {
        let key = `getBotOperationsHistory${args.id}`
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
      return this.backend.http.get<GetOperations>(`${this.backend.apiUrl}/bot/${args.id}/operations`)
    }
  }
}
