import OrderItemInterface from "./OrderItem"
import Product from "./Product"
export interface OrderInterface {
  order_id: number
  userId: number
  orderItems: OrderItemInterface[]
}
