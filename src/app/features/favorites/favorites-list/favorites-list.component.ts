import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {selectIsOrderFavorite, selectIsPatientFavorite, selectOrders, selectPatients, State} from '../state';
import {Observable} from 'rxjs';
import {Order} from '../../orders/models';
import {Patient} from '../../patients/models';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {addToFavorite, removeFromFavorite} from '../state/favorite.actions';

@Component({
  selector: 'st-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent {
  displayedOrderColumns: string[] = ['orderNum', 'orderName', 'status', 'creator', 'favorite'];
  displayedPatientsColumns: string[] = ['id', 'fullName', 'age', 'favorite'];
  favoriteOrders$: Observable<Order[]> = this._store.select(selectOrders);
  favoritePatients$: Observable<Patient[]> = this._store.select(selectPatients);
  isOrderFavorite = (id) => this._store.select(selectIsOrderFavorite(id));
  isPatientFavorite = (id) => this._store.select(selectIsPatientFavorite(id));
  constructor(
    private readonly _store: Store<State>,
  ) { }

  changeFavorite(event: MatCheckboxChange, id: number, favType: keyof State) {
    event.checked
      ? this._store.dispatch(addToFavorite({favType, id}))
      : this._store.dispatch(removeFromFavorite({favType, id}));
  }
}
