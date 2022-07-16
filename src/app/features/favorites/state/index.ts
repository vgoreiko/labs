import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./favorite.reducer";
import * as fromOrders from "../../orders/state/order.reducer";
import * as fromPatients from "../../patients/state/patient.reducer";

export {State} from "./favorite.reducer";

export const favoritesFeatureKey = 'favorites';

export const selectFavoritesState = createFeatureSelector<State>(favoritesFeatureKey);
export const selectOrdersState = createFeatureSelector<fromOrders.State>(fromOrders.ordersFeatureKey);
export const selectPatientsState = createFeatureSelector<fromPatients.State>(fromPatients.patientsFeatureKey);
export const selectFavoriteOrdersIds = createSelector(selectFavoritesState, state => {
  return state.orders;
});
export const selectFavoritePatientsIds = createSelector(selectFavoritesState, state => {
  return state.patients;
});

export const selectIsOrderFavorite = (id: number) =>
  createSelector(selectFavoriteOrdersIds, (ids) => ids.includes(id));

export const selectIsPatientFavorite = (id: number) =>
  createSelector(selectFavoritePatientsIds, (ids) => ids.includes(id));

export const selectOrders = createSelector(
  selectOrdersState,
  selectFavoriteOrdersIds,
  (state, ids) => {
    return ids.map(id => state.entities[id])
  }
);
export const selectPatients = createSelector(
  selectPatientsState,
  selectFavoritePatientsIds,
  (state, ids) => {
    return ids.map(id => state.entities[id])
  }
)

export const selectFilteredOrders = (term?: string) =>
  createSelector(selectOrders, (orders) => {
    if(!term) return orders;
    return orders.filter(order => order?.orderName.toLowerCase().includes(term.toLowerCase()));
  });

export const selectFilteredPatients = (term?: string) =>
  createSelector(selectPatients, (patients) => {
    if(!term) return patients;
    return patients.filter(patient => patient?.fullName.toLowerCase().includes(term.toLowerCase()));
  });
