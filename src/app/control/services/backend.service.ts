import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  apiUrl: string
  shouldMock: boolean
  mockBuffer: { [k: string]: any } = {};

  constructor(public http: HttpClient) {
    this.apiUrl = environment.baseUrl
    this.shouldMock = environment.mockBackend
  }

  getOrCreate(key: string, def: () => any): any {
    if (this.mockBuffer[key] == undefined) {
      this.mockBuffer[key] = def()
    }
    return this.mockBuffer[key]
  }
}
