import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Loader {
  private requestCount = 0;
  private isLoading$ = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.isLoading$.asObservable();

  show() {
    console.log('valling');
    this.requestCount++;
    this.isLoading$.next(true);
  }

  hide() {
    console.log('calling');
    this.isLoading$.next(false);
    this.requestCount--;
  }
}
