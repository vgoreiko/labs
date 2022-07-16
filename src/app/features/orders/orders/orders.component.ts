import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from "@angular/core";

import { ROUTE_ANIMATIONS_ELEMENTS } from "../../../core/core.module";
import {State} from "../state/order.reducer";
import {Store} from "@ngrx/store";
import {clearOrders, loadOrders} from "../state/order.actions";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private readonly _store: Store<State>,
  ) {}

  ngOnInit() {
    this._store.dispatch(loadOrders());
  }

  ngOnDestroy() {
    // to prevent data be persistent
    // can be solved by @ngrx/component-store (was not added in package.json)
    this._store.dispatch(clearOrders());
  }
}
