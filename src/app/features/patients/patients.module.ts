import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from "@ngrx/effects";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";

import {SharedModule} from "../../shared/shared.module";
import {PatientsRoutingModule} from "./patients-routing.module";
import {PatientsComponent} from "./patients/patients.component";
import * as fromPatient from './state/patient.reducer';
import {PatientEffect} from "./state/patient.effect";
import {PatientService} from "./patient.service";

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    SharedModule,
    PatientsRoutingModule,
    StoreModule.forFeature(fromPatient.patientsFeatureKey, fromPatient.reducer),
    EffectsModule.forFeature([PatientEffect]),
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [
    PatientService,
  ]
})
export class PatientsModule {
}
