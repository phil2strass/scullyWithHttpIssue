import { Component, OnInit } from "@angular/core";
import { TransferStateService } from "@scullyio/ng-lib";
import { combineLatest, map, of } from "rxjs";
import { LieuxService } from "../services/lieux.service";

@Component({
  selector: "app-home",
  template: ` <p>home works!</p>
    <div *ngIf="lieu$ | async as lieu">
      <label>Name</label>
      <p>{{ lieu.name }}</p>
    </div>`,
  styles: [],
})
export class HomeComponent implements OnInit {
  lieu$ = this.tss.useScullyTransferState(
    "LieuComponent",
    combineLatest({
      lieux: this.lieux.lieux$,
      id: of(1),
    }).pipe(map(({ lieux, id }) => lieux.find((lieu) => lieu.id === +id)))
  );

  constructor(private lieux: LieuxService, private tss: TransferStateService) {}

  ngOnInit(): void {}
}
