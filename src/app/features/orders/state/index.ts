import {createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromOrders from './order.reducer';
import {LoadingStateEnum} from "../models";
export {reducer} from './order.reducer';

export interface State {
  orders: fromOrders.State;
}
export const selectOrdersState = createFeatureSelector<fromOrders.State>(fromOrders.ordersFeatureKey);

export const selectAllOrders = createSelector(
  selectOrdersState,
  fromOrders.selectAll
);
export const selectLoadingState = createSelector(
  selectOrdersState,
  (state) => state.loading,
)
export const isLoadingNotStarted = createSelector(
  selectLoadingState,
  (state) => state === LoadingStateEnum.NOT_STARTED
)
export const isLoadingInProgress = createSelector(
  selectLoadingState,
  (state) => state === LoadingStateEnum.LOADING
)
