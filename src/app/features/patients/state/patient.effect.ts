import {Injectable} from '@angular/core';
import {Actions, createEffect} from '@ngrx/effects';
import {ofType} from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

import {PatientService} from "../patient.service";
import {loadPatients, loadPatientsError, loadPatientsSuccess} from "./patient.actions";

@Injectable()
export class PatientEffect {
  constructor(
    private actions$: Actions,
    private _patientService: PatientService,
  ) {
  }

  loadOrders$ = createEffect(
    () => this.actions$.pipe(
      ofType(loadPatients),
      switchMap(() => this._patientService.getPatients()
        .pipe(
          map(resp => loadPatientsSuccess({patients: resp.patient})),
          catchError((e) => of(loadPatientsError({error: e})))
        ))
    )
  );
}
