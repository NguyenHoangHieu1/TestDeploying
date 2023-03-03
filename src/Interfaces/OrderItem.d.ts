import Product from "./Product"

export default interface OrderItemInterface {
  orderId: number
  orderItem: number
  title: string
  description: string
  imageUrl: string
  price: number
  productId: number
  quantity: number
}
