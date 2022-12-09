import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Strategy} from "../../model/strategy.model";
import {StrategyRisk} from "../../model/strategy-risk.model";
import {Parameter} from "../../model/parameter.model";
import {Bot} from "../../model/bot.model";
import {BotStatus} from "../../model/bot-status.model";

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
