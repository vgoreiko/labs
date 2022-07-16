import {Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectFilteredOrders, selectFilteredPatients,
  selectIsOrderFavorite,
  selectIsPatientFavorite, selectOrders, selectPatients,
  State
} from '../state';
import {combineLatest, Observable, Subject} from 'rxjs';
import {Order} from '../../orders/models';
import {Patient} from '../../patients/models';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {addToFavorite, removeFromFavorite} from '../state/favorite.actions';
import {FormBuilder, FormGroup} from "@angular/forms";
import {startWith, switchMap} from "rxjs/operators";

@Component({
  selector: 'st-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent implements OnDestroy {
  form: FormGroup = this._createGroup();
  displayedOrderColumns: string[] = ['orderNum', 'orderName', 'status', 'creator', 'favorite'];
  displayedPatientsColumns: string[] = ['id', 'fullName', 'age', 'favorite'];
  searchChange$: Observable<string> = this.form.get('search').valueChanges.pipe(startWith(''));
  favoriteOrders$: Observable<Order[]> = combineLatest([this._store.select(selectOrders), this.searchChange$])
    .pipe(switchMap(([_, term]) => this._store.select(selectFilteredOrders(term))));
  favoritePatients$: Observable<Patient[]> = combineLatest([this._store.select(selectPatients), this.searchChange$])
    .pipe(switchMap(([_, term]) => this._store.select(selectFilteredPatients(term)) ));
  isOrderFavorite = (id) => this._store.select(selectIsOrderFavorite(id));
  isPatientFavorite = (id) => this._store.select(selectIsPatientFavorite(id));
  private _componentDestroy$ = new Subject();

  constructor(
    private readonly _store: Store<State>,
    private readonly _fb: FormBuilder,
  ) {
  }

  ngOnDestroy() {
    this._componentDestroy$.next();
    this._componentDestroy$.complete();
  }

  changeFavorite(event: MatCheckboxChange, id: number, favType: keyof State) {
    event.checked
      ? this._store.dispatch(addToFavorite({favType, id}))
      : this._store.dispatch(removeFromFavorite({favType, id}));
  }

  private _createGroup(): FormGroup {
    return this._fb.group({
      search: []
    });
  }
}
