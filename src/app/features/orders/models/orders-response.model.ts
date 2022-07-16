import {Order} from "./order.model";

export interface OrdersResponseModel {
  count: number;
  undisplayedMatches: boolean;
  moreUncountedMatches: boolean;
  order: Order[];
}
