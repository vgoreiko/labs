import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {ofType} from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import {OrdersService} from "../orders.service";
import {loadOrders, loadOrdersError, loadOrdersSuccess} from "./order.actions";

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private _ordersService: OrdersService,
  ) {
  }

  loadOrders$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadOrders),
      switchMap(() => this._ordersService.getOrders()
        .pipe(
          map(ordersResponse => loadOrdersSuccess({orders: ordersResponse.order})),
          catchError((e) => of(loadOrdersError({error: e})))
        ))
    )
  );
}
