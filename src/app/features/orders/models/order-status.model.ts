import {OrderStatusIdentifier} from "./order-status-identifier.enum";

export interface OrderStatus {
  name: string;
  identifier: OrderStatusIdentifier;
}
