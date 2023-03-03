import props from "../../../Interfaces/Props"
import Button from "../../UI/Button"
import classes from "./Order.module.css"
import Product from "../../../Interfaces/Product"
import Card from "../../UI/Card"
import useApi from "../../../customHooks/useApi"
import { useEffect, useState } from "react"
import { OrderInterface } from "../../../Interfaces/Order"
import Order from "./Order"
import { useAppSelector } from "../../../store"
const OrderPage: React.FC<props> = (props) => {
  const [orders, setOrders] = useState<OrderInterface[]>([])
  const apiHook = useApi()
  const userId = useAppSelector((state) => state.auth).userId
  let totalQuantity = 0
  let totalPrice = 0
  useEffect(() => {
    apiHook(import.meta.env.VITE_API_GET_ORDERS + userId, {
      useData(data) {
        setOrders(data.orders)
      },
    })
  }, [])

  orders.map((order) => {
    order.orderItems.map((orderItem) => {
      if (orderItem.quantity && orderItem.price) {
        totalQuantity += orderItem.quantity!
        totalPrice += orderItem.price * orderItem.quantity!
      }
    })
  })

  const displayOrders =
    orders.length > 0 ? (
      <ul className={classes.orderList}>
        <Order orders={orders} />
      </ul>
    ) : (
      <h1>No Order Found!</h1>
    )
  return (
    <Card>
      {displayOrders}
      <div>
        <h1>Total Quantity: {totalQuantity}</h1>
        <h1>Total Price : {totalPrice}</h1>
      </div>
    </Card>
  )
}

export default OrderPage
