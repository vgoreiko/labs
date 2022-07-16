import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Order} from '../models/order.model';
import * as OrderActions from './order.actions';

export const ordersFeatureKey = 'orders';

export interface State extends EntityState<Order> {
  favoriteIds: number[];
  loading: 'loading' | 'loaded' | 'errored' | 'notStarted'; // TODO: create enum
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (model: Order) => model.orderNum,
});

export const initialState: State = adapter.getInitialState({
  favoriteIds: [],
  loading: 'notStarted',
});

export const reducer = createReducer(
  initialState,
  on(OrderActions.loadOrders,
    (state) => {
      return {...state, loading: 'loading'}
    }
  ),
  on(OrderActions.loadOrdersSuccess,
    (state, action) =>adapter.setAll(action.orders, {...state, loading: 'loaded'})
  ),
  on(OrderActions.loadOrdersError,
    (state) => ({...state, loading: 'notStarted'})
  ),
  on(OrderActions.clearOrders,
    (state) => adapter.removeAll({...state, loading: 'notStarted'})
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
