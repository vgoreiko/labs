import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Order} from '../models/order.model';
import * as OrderActions from './order.actions';
import {LoadingStateEnum} from "../models/loading-state.enum";

export const ordersFeatureKey = 'orders';

export interface State extends EntityState<Order> {
  favoriteIds: number[];
  loading: LoadingStateEnum;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (model: Order) => model.orderNum,
});

export const initialState: State = adapter.getInitialState({
  favoriteIds: [],
  loading: LoadingStateEnum.NOT_STARTED,
});

export const reducer = createReducer(
  initialState,
  on(OrderActions.loadOrders,
    (state) => {
      return {...state, loading: LoadingStateEnum.LOADING}
    }
  ),
  on(OrderActions.loadOrdersSuccess,
    (state, action) => adapter.setAll(
      action.orders,
      {
        ...initialState,
        loading: LoadingStateEnum.LOADED,
      })
  ),
  on(OrderActions.loadOrdersError,
    () => ({...initialState, loading: LoadingStateEnum.NOT_STARTED})
  ),
  on(OrderActions.changeOrderFavorite,
    (state, action) => {
      const {id, checked} = action;
      const {favoriteIds} = state;
      return {
        ...state,
        favoriteIds: checked ? [...favoriteIds, id] : favoriteIds.filter(item => item !== id),
      }
    }
  ),
);

export const {
  selectAll,
} = adapter.getSelectors();
