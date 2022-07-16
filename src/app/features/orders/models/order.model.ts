import {OrderStatus} from "./order-status.model";
import {OrderCreator} from "./order-creator.model";

export interface Order {
  orderNum: number;
  orderName: string;
  isRejected: boolean;
  hasComments: boolean;
  status: OrderStatus;
  creator: OrderCreator;
}
