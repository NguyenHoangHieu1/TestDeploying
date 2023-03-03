import { OrderInterface } from "./Order"
import Product from "./Product"

export interface Response {
  products?: Product[]
  product?: Product
  token?: string
  validAcc?: string
  message: string
  userId?: string
  cartItems: Product[]
  status: number
  orders: OrderInterface[]
  userIsAdmin: number
}
