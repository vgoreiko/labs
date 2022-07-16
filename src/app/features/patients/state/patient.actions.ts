import { createAction, props } from '@ngrx/store';

import { Patient } from '../models/patient.model';

export const loadPatients = createAction(
  '[Patient/API] Load Patients',
);
export const loadPatientsSuccess = createAction(
  '[Patient/API] Load Patients Success',
  props<{ patients: Patient[] }>()
);
export const loadPatientsError = createAction(
  '[Patient/API] Load Patients Error',
  props<{ error: string }>()
);
export const clearPatients = createAction(
  '[Patient/API] Clear Patients'
);
export const changePatientFavorite = createAction(
  '[Patient/API] Change Patient Favorite',
  props<{ id: number, checked: boolean }>()
);
