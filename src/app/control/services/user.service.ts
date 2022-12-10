import {Injectable} from "@angular/core";
import {BackendService} from "./backend.service";
import {catchError, map, Observable} from "rxjs";
import {User} from "../../model/user.model";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

interface SignUpInput {
  username: string,
  password: string,
  tinkoff: string
}

interface SignInInput {
  username: string,
  password: string
}

interface SignIn {
  jwt: string,
  tinkoff: string
}

interface GetAmount {
  amount: number
}

@Injectable({
  providedIn: 'root',

})
export class UserService implements HttpInterceptor {

  private user: User | undefined
  private jwt_token: string | undefined

  getUser(): User | undefined {
    return this.user
  }

  constructor(private backend: BackendService) {
  }

  isAuthorized(): boolean {
    return this.jwt_token != undefined
  }

  signUp(args: SignUpInput): Observable<{}> {
    if (this.backend.shouldMock) {
      return new Observable(subscriber => {
        subscriber.complete()
      })
    } else {
      return this.backend.http.post(`${this.backend.apiUrl}/signup`, args)
    }
  }

  signIn(args: SignInInput): Observable<User> {
    let target: Observable<SignIn>
    if (this.backend.shouldMock) {
      target = new Observable<SignIn>(subscriber => {
        let value = this.backend.getOrCreate('signIn', () => {
          return {
            jwt: "<jwt>",
            tinkoff: "<tinkoff>"
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.post<SignIn>(`${this.backend.apiUrl}/signin`, args)
    }
    return target.pipe(map(value => {
      let result = new User()
      result.username = args.username
      result.tinkoff_token = value.tinkoff

      this.jwt_token = value.jwt
      this.user = result

      return result
    }))
  }

  getAmount(): Observable<number> {
    let target: Observable<GetAmount>
    if (this.backend.shouldMock) {
      target = new Observable<GetAmount>(subscriber => {
        let value = this.backend.getOrCreate('getAmount', () => {
          return {
            amount: 100000
          }
        })
        subscriber.next(value)
        subscriber.complete()
      })
    } else {
      target = this.backend.http.get<GetAmount>(`${this.backend.apiUrl}/user/amount`)
    }
    return target.pipe(map(value => value.amount))
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.jwt_token
    if (token) {
      let cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
      return next.handle(cloned).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              this.jwt_token = undefined
              this.user = undefined
            }
          }
          throw err
        })
      )
    } else {
      return next.handle(req)
    }
  }

}
