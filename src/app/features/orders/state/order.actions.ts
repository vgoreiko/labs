import {createAction, props} from '@ngrx/store';

import {Order} from '../models/order.model';

export const loadOrders = createAction(
  '[Order/API] Load Orders',
);
export const loadOrdersSuccess = createAction(
  '[Order/API] Load Orders Success',
  props<{ orders: Order[] }>()
);
export const loadOrdersError = createAction(
  '[Order/API] Load Orders Error',
  props<{ error: string }>()
);
export const clearOrders = createAction(
  '[Order/API] Clear Orders'
);
