import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {LoadingStateEnum, Patient} from '../models';
import * as PatientActions from './patient.actions';

export const patientsFeatureKey = 'patients';

export interface State extends EntityState<Patient> {
  favoriteIds: number[];
  loading: LoadingStateEnum;
}

export const adapter: EntityAdapter<Patient> = createEntityAdapter<Patient>({
  selectId: (model: Patient) => model.code,
});

export const initialState: State = adapter.getInitialState({
  favoriteIds: [],
  loading: LoadingStateEnum.NOT_STARTED,
});

export const reducer = createReducer(
  initialState,
  on(PatientActions.loadPatients,
    () => ({...initialState, loading: LoadingStateEnum.LOADING})
  ),
  on(PatientActions.loadPatientsSuccess,
    (state, action) => {
    return adapter.setAll(action.patients.map(item => Patient.fromJS(item)), {...initialState, loading: LoadingStateEnum.LOADED })
    }
  ),
  on(PatientActions.loadPatientsError,
    () => ({...initialState, loading: LoadingStateEnum.ERRORED})
  ),
  on(PatientActions.changePatientFavorite,
    (state, action) => {
      const {id, checked} = action;
      const {favoriteIds} = state;
      return {
        ...state,
        favoriteIds: checked ? [...favoriteIds, id] : favoriteIds.filter(item => item !== id),
      }
    }
  ),
  on(PatientActions.clearPatients,
    (state) => {
      return adapter.removeAll({...state, favoriteIds: []})
    }
  ),
);

export const {
  selectAll,
} = adapter.getSelectors();
