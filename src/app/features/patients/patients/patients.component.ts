import {Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy} from "@angular/core";

import {Observable, Subject} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {debounceTime, takeUntil} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Patient} from "../models";
import {isLoadingInProgress, isLoadingNotStarted, selectAllPatients, State} from "../state";
import {loadPatients} from "../state/patient.actions";
import {addToFavorite, removeFromFavorite} from "../../favorites/state/favorite.actions";
import {selectIsPatientFavorite} from "../../favorites/state";

@Component({
  selector: "st-patients",
  templateUrl: "./patients.component.html",
  styleUrls: ["./patients.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientsComponent implements OnInit, OnDestroy {
  patients$: Observable<Patient[]> = this._store.select(selectAllPatients);
  loadingNotStarted$: Observable<boolean> = this._store.select(isLoadingNotStarted);
  loadingInProgress$: Observable<boolean> = this._store.select(isLoadingInProgress);
  isPatientFavorite = (id) => this._store.select(selectIsPatientFavorite(id));
  getPatients$: Subject<MouseEvent> = new Subject();
  componentDestroy$ = new Subject();
  displayedColumns: string[] = ["id", "fullName", "age", "favorite"];
  dataSource: MatTableDataSource<Patient>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly _store: Store<State>,
  ) {}

  ngOnInit() {
    this.getPatients$.pipe(
      takeUntil(this.componentDestroy$),
      debounceTime(200),
    ).subscribe(() => this._store.dispatch(loadPatients()));
    this.patients$
      .pipe(takeUntil(this.componentDestroy$),)
      .subscribe((patients) => {
        this.dataSource = new MatTableDataSource(patients);
        this.dataSource.paginator = this.paginator;
        if(this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      });
  }

  ngOnDestroy() {
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }

  changeFavorite(event: MatCheckboxChange, id: number) {
    event.checked
      ? this._store.dispatch(addToFavorite({favType: "patients", id}))
      : this._store.dispatch(removeFromFavorite({favType: "patients", id}));
  }

  handleGetPatients() {
    this.getPatients$.next();
  }
}
