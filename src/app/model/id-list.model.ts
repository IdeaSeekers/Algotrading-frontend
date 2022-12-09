import {Observable} from "rxjs";

export class IdList<T> {
  private ids: Set<number> = new Set<number>()
  private data: { [k: number]: T | undefined } = {}

  private idLoader: () => Observable<Array<number>>
  private dataLoader: (id: number) => Observable<T>

  constructor(
    idLoader: () => Observable<Array<number>>,
    dataLoader: (id: number) => Observable<T>,
  ) {
    this.idLoader = idLoader
    this.dataLoader = dataLoader
  }

  getFreshData(refreshOnlyNew: boolean = false): Observable<[number, T]> {
    return new Observable(subscriber => {

      let emitted = 0
      let expected = 0

      this.idLoader().subscribe(newIds => {
        let old = this.ids
        this.ids = new Set<number>(newIds)
        expected = this.ids.size
        for (let id of this.ids) {
          if (!refreshOnlyNew || !old.has(id)) {
            this.dataLoader(id).subscribe(newData => {
              this.data[id] = newData
              subscriber.next([id, newData])
              emitted += 1
              if (emitted >= expected) {
                subscriber.complete()
              }
            })
          } else {
            subscriber.next([id, this.data[id]!])
            emitted += 1
            if (emitted >= expected) {
              subscriber.complete()
            }
          }
          old.delete(id)
        }
        for (let id of old) {
          this.data[id] = undefined
        }
      })
    })
  }

}
