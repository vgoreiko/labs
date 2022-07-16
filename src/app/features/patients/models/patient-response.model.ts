import {Patient} from "./patient.model";

export interface PatientResponse {
  count: number;
  undisplayedMatches: boolean;
  moreUncountedMatches: boolean;
  patient: Patient[];
}
