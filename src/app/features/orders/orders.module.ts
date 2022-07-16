import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from '@ngrx/store';

import {SharedModule} from "../../shared/shared.module";
import {OrdersComponent} from "./orders/orders.component";
import {OrdersRoutingModule} from "./orders-routing.module";
import * as fromOrder from './state/order.reducer';
import {OrdersService} from "./orders.service";
import {EffectsModule} from "@ngrx/effects";
import {OrdersEffects} from "./state/order.effects";

@NgModule({
  declarations: [
    OrdersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrdersRoutingModule,
    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  providers: [
    OrdersService,
  ],
})
export class OrdersModule {
}
