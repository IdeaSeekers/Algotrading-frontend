import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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

  getStrategiesId() {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/strategy`)
    }
  }

  getStrategyById(args: { id: number }) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/strategy/${args.id}`)
    }
  }

  getParameterById(args: { id: number }) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/parameter/${args.id}`)
    }
  }

  getBotsId() {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/bot`)
    }
  }

  getBotById(args: { id: number }) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
        let value = this.getOrCreate(`getBotById${args.id}`, () => {
          let name = "Bot Name " + (args.id + 1).toString()
          let inputAmount = Math.random() * 1000
          let currentBalance = Math.random() * 1000
          return {
            name: name,
            strategy: {
              id: 0
            },
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
      return this.http.get(`${this.apiUrl}/bot/${args.id}`)
    }
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
  }) {
    if (this.shouldMock) {
      return new Observable(subscriber => {
        subscriber.next({
          bot: 0
        })
        subscriber.complete();
      })
    } else {
      return this.http.post(`${this.apiUrl}/product`, args)
    }
  }

  stopBot(args: {id: number}) {
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
  }) {
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

  getNumberOfActiveBots(args: {id: number}) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/strategy/${args.id}/active`)
    }
  }

  getAverageStrategyReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
        let value = this.getOrCreate(`getAverageStrategyReturn${args.id}`, () => {
          return {
            average_return: Math.random() * 1000 - 500
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
      return this.http.get(`${this.apiUrl}/strategy/${args.id}/average_return${query}`)
    }
  }

  getStrategyReturnHistory(args: {id: number}) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
        let data = this.http.get<Array<Array<number>>>('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
        data.subscribe({
          next(value) {
            subscriber.next({
              return_history: value.map(item => {
                return {
                  timestamp: item[0],
                  average_return: item[1]
                }
              })
            })
          },
          complete() {
            subscriber.complete()
          }
        })
      })
    } else {
      return this.http.get(`${this.apiUrl}/strategy/${args.id}/return_history`)
    }
  }

  getBotReturn(args: {
    id: number,
    from?: number,
    to?: number,
  }) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
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
      return this.http.get(`${this.apiUrl}/bot/${args.id}/average_return${query}`)
    }
  }

  getBotOperationsHistory(args: {id: number}) {
    if (this.shouldMock) {
      return new Observable<Object>(subscriber => {
        let data = this.http.get<Array<Array<number>>>('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json')
        data.subscribe({
          next(value) {
            subscriber.next({
              operations: value.map(item => {
                return {
                  type: 'buy',
                  timestamp: item[0],
                  executed_price: Math.random() * item[1],
                  return: item[1]
                }
              })
            })
          },
          complete() {
            subscriber.complete()
          }
        })
      })
    } else {
      return this.http.get(`${this.apiUrl}/bot/${args.id}/operations`)
    }
  }

}
