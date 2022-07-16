import {ActionReducerMap, createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromOrders from './patient.reducer';
import {LoadingStateEnum} from "../models";

export interface State {
  patients: fromOrders.State;
}

export const reducers: ActionReducerMap<State> = {
  patients: fromOrders.reducer,
};

export const selectPatientState = createFeatureSelector<fromOrders.State>(fromOrders.patientsFeatureKey);

export const selectAllPatients = createSelector(
  selectPatientState,
  fromOrders.selectAll
);
export const selectLoadingState = createSelector(
  selectPatientState,
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
export const selectFavoritePatientIds = createSelector(
  selectPatientState,
  (state) => state.favoriteIds
);
export const selectIsPatientFavorite = (id: number) =>
  createSelector(selectFavoritePatientIds, (ids) => ids.includes(id));
