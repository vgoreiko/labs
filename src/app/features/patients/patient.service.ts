import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PatientResponse} from "./models";
import {Observable} from "rxjs";

@Injectable()
export class PatientService {

  constructor(
    private readonly _httpClient: HttpClient,
  ) { }

  public getPatients(): Observable<PatientResponse> {
    return this._httpClient.get<PatientResponse>('https://api.mocki.io/v2/51597ef3');
  }
}
