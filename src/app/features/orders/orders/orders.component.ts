import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Order} from "../models";
import {
  changeOrderFavorite,
  clearOrders,
  loadOrders,
} from "../state/order.actions";
import {
  selectAllOrders,
  isLoadingNotStarted,
  State,
  isLoadingInProgress,
  selectIsOrderFavorite
} from "../state";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: "st-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders$: Observable<Order[]> = this._store.select(selectAllOrders);
  loadingNotStarted$: Observable<boolean> = this._store.select(isLoadingNotStarted);
  loadingInProgress$: Observable<boolean> = this._store.select(isLoadingInProgress);
  isOrderFavorite = (id) => this._store.select(selectIsOrderFavorite(id));
  getOrders$: Subject<MouseEvent> = new Subject();
  componentDestroy$ = new Subject();
  displayedColumns: string[] = ['orderNum', 'orderName', 'status', 'creator', 'favorite'];
  dataSource: MatTableDataSource<Order>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly _store: Store<State>,
  ) {}

  ngOnInit() {
    this.getOrders$.pipe(
      takeUntil(this.componentDestroy$),
      debounceTime(200),
    ).subscribe(() => this._store.dispatch(loadOrders()));
    this.orders$
      .pipe(takeUntil(this.componentDestroy$),)
      .subscribe((orders) => {
       this.dataSource = new MatTableDataSource(orders);
       this.dataSource.paginator = this.paginator;
       if(this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
       }
    });
  }

  ngOnDestroy() {
    // to prevent data to be persistent
    // can be solved by @ngrx/component-store (was not added in package.json)
    this._store.dispatch(clearOrders());
    this.componentDestroy$.next();
    this.componentDestroy$.complete();
  }

  changeFavorite(event: MatCheckboxChange, id: number) {
    this._store.dispatch(changeOrderFavorite({id, checked: event.checked}));
  }

  handleGetOrders() {
    this.getOrders$.next();
  }
}
