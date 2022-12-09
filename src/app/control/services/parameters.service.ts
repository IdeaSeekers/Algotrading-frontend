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

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  constructor(private backend: BackendService) {
  }

  getParameterById(args: { id: number }): Observable<Parameter> {
    let target: Observable<ParameterById>
    if (this.backend.shouldMock) {
      target = new Observable(subscriber => {
        let value = this.backend.getOrCreate(`getParameterById${args.id}`, () => {
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
}
