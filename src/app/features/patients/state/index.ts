import {createFeatureSelector, createSelector,} from '@ngrx/store';
import * as fromPatients from './patient.reducer';
import {LoadingStateEnum} from "../models";
export {reducer} from './patient.reducer';

export interface State {
  patients: fromPatients.State;
}

export const selectPatientState = createFeatureSelector<fromPatients.State>(fromPatients.patientsFeatureKey);

export const selectAllPatients = createSelector(
  selectPatientState,
  fromPatients.selectAll
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


