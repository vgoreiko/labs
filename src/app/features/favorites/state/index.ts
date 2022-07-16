import * as fromOrders from "../../orders/state";
import * as fromPatients from "../../patients/state";
import {combineReducers, createFeatureSelector, createSelector} from "@ngrx/store";

export const favoritesFeatureKey = 'favorites';

export interface State {
  orders: fromOrders.ordersState;
  patients: fromPatients.patientState;
}

export const reducer = combineReducers({
  orders: fromOrders.reducer,
  patients: fromPatients.reducer,
});

export const selectFavoritesState = createFeatureSelector<State>(favoritesFeatureKey);
export const selectOrdersState = createSelector(selectFavoritesState, state => {
  return state.orders;
});
export const selectPatientsState = createSelector(selectFavoritesState, state => {
  return state.patients;
});
export const selectOrders = createSelector(
  selectOrdersState,
  (state) => {
    return state.favoriteIds.map(i => state.entities[i]);
  }
);
export const selectPatients = createSelector(
  selectPatientsState,
  (state) => {
    return state.favoriteIds.map(i => state.entities[i]);
  }
)
