import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferStateService } from '@scullyio/ng-lib';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Lieu } from './lieu.interface';

export type SortFields = 'name';

@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  filter = new BehaviorSubject<string>('');
  sortProp = new BehaviorSubject<SortFields>('name');
  lieux$ = combineLatest({
    lieux: this.http.get<Lieu[]>('http://localhost:3000/lieux'),
    sortBy: this.sortProp,
  }).pipe(
    map(({ lieux, sortBy }) =>
      lieux.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
    )
  );

  filteredLieux$ = combineLatest({
    lieux: this.tss.useScullyTransferState(
      'uLieux',
      this.lieux$.pipe(map((lieux) => lieux.map(({ name }) => ({ name }))))
    ),
    filter: this.filter,
    prop: this.sortProp,
  }).pipe(
    map(({ lieux, filter, prop }) =>
      lieux.filter((lieu) =>
        filter
          ? ('' + lieu[prop]).toLowerCase().includes(filter.toLowerCase())
          : true
      )
    ),
    map((lieux) => lieux.slice(0, 25))
  );

  constructor(private http: HttpClient, private tss: TransferStateService) {}

  setFilterTo(filter: string) {
    this.filter.next(filter);
  }

  setSortTo(sortProp: SortFields) {
    this.sortProp.next(sortProp);
  }
}
