import Product from "../../../Interfaces/Product"
import props from "../../../Interfaces/Props"
import classes from "./Order.module.css"
import OrderItem from "./OrderItem"
const Order: React.FC<props> = (props) => {
  console.log(props.orders)
  const loadedOrders = props.orders!.map((order) => {
    let totalPrice = 0
    let totalQuantity = 0
    order.orderItems.map((orderItem) => {
      if (orderItem.quantity && orderItem.price) {
        totalQuantity += orderItem.quantity!
        totalPrice += orderItem.price * orderItem.quantity!
      }
    })
    return (
      <li key={order.order_id} className={classes.order}>
        <details>
          <summary>Id of the order:{order.order_id}</summary>
          <ul className={classes.productList}>
            {order.orderItems.map((orderItem) => {
              return (
                <OrderItem
                  key={orderItem.orderItem}
                  orderItem={orderItem}
                ></OrderItem>
              )
            })}
          </ul>
          <p className={classes.orderCost}>Total Quantity:{totalQuantity}</p>
          <p className={classes.orderCost}>Total Price : {totalPrice}</p>
        </details>
      </li>
    )
  })
  return <>{loadedOrders}</>
}

export default Order
