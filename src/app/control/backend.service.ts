import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) {
  }

  createBot(botName: string, rubles: number) {
    return this.http.post('http://localhost:8080/product', {
      name: botName,
      rubles: rubles
    })
  }
}
