import classes from "./OrderItem.module.css"
import props from "../../../Interfaces/Props"

const OrderItem: React.FC<props> = (props) => {
  console.log(props.orderItem)
  if (props.orderItem)
    return (
      <li key={props.orderItem.productId} className={classes.product}>
        <div className={classes.productInfo}>
          <div>
            <img src={props.orderItem.imageUrl} alt="" />
          </div>
          <div>
            <h3>Name:{props.orderItem.title}</h3>
          </div>
        </div>
        <div className={classes.productDescription}>
          {props.orderItem.description}
        </div>
        <div className={classes.productAction}>
          <p>Price:{props.orderItem.price}</p>
          <h3>Quantity:{props.orderItem.quantity}</h3>
          <i>
            Total Price : {props.orderItem.quantity! * props.orderItem.price}
          </i>
        </div>
      </li>
    )
  else return <></>
}

export default OrderItem
