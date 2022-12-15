import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Parameter} from "../../model/parameter.model";
import {BackendService} from "./backend.service";

interface ParameterById {
  name: string,
  description: string,
  type: 'int' | 'float',
  min?: number,
  max?: number
}

interface Securities {
  securities: Array<{
    name: string,
    id: number,
  }>
}

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  securities!: Securities

  constructor(private backend: BackendService) {
    this.getSecurities().subscribe(value => {
      this.securities = value
    })
  }

  getParameterById(args: { id: number }): Observable<Parameter> {
    let target: Observable<ParameterById>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getParameterById${args.id}`, () => {
          switch (args.id) {
            case 0:
              return {
                name: 'security',
                description: 'some description',
                type: 'int'
              }
            case 1:
              return {
                name: 'initial balance',
                description: 'some description',
                type: 'float',
                min: 0,
                max: 1000000
              }
            default:
              return {
                name: `some param ${args.id}`,
                description: 'some description',
                type: 'float'
              }
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<ParameterById>(`${this.backend.apiUrl}/parameter/${args.id}`)
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

  getSecurities(): Observable<Securities> {
    let target: Observable<Securities>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate('getSecurities', () => {
          return {
            securities: [
              {
                name: "Нижнекамскнефтехим",
                id: 0
              },
              {
                name: "Яндекс",
                id: 1
              },
              {
                name: "Сбер",
                id: 2
              }
            ]
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<Securities>(`${this.backend.apiUrl}/security`)
    }
    return target
  }

}
