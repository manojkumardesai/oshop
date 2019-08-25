import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  githubUsers$: Subject<any> = new Subject<any>();
  constructor() { }

  setUsers(msg) {
    this.githubUsers$.next(msg);
  }
}
