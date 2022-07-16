import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from "@ngrx/store";
import {selectOrders, selectPatients, State} from "../state";
import {Observable} from "rxjs";
import {Order} from "../../orders/models";
import {Patient} from "../../patients/models";

@Component({
  selector: 'st-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent implements OnInit {
  favoriteOrders$: Observable<Order[]> = this._store.select(selectOrders);
  favoritePatients$: Observable<Patient[]> = this._store.select(selectPatients);

  constructor(
    private readonly _store: Store<State>,
  ) { }

  ngOnInit(): void {
  }

}
