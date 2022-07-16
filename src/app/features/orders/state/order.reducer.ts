import {createReducer, on} from '@ngrx/store';
import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {Order} from '../models/order.model';
import * as OrderActions from './order.actions';
import {LoadingStateEnum} from "../models/loading-state.enum";

export const ordersFeatureKey = 'orders';

export interface State extends EntityState<Order> {
  favoriteIds: number[];
  loading: LoadingStateEnum; // TODO: create enum
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
    (state, action) => adapter.setAll(action.orders, {...state, loading: LoadingStateEnum.LOADED})
  ),
  on(OrderActions.loadOrdersError,
    (state) => ({...state, loading: LoadingStateEnum.NOT_STARTED})
  ),
  on(OrderActions.clearOrders,
    (state) => adapter.removeAll({...state, loading: LoadingStateEnum.NOT_STARTED})
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
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
