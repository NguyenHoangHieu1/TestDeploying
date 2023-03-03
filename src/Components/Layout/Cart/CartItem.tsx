import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./CartItem.module.css";
import { useAppSelector } from "../../../store";
import useApi from "../../../customHooks/useApi";
import { useRef } from "react";
const CartItem: React.FC<props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const userId = useAppSelector((state) => state.auth).userId;
  const apiHook = useApi();
  function removeItemFromCartHandler() {
    if (props.product && props.onRemoveItem && inputRef && inputRef.current) {
      apiHook(import.meta.env.VITE_API_DELETE_CART_ITEM, {
        method: "DELETE",
        body: {
          userId: userId,
          quantityToDelete: inputRef.current.value,
          productId: props.product.product_id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        useData(data) {
          if (data && data.cartItems && props && props.onRemoveItem) {
            console.log(data.cartItems);
            props.onRemoveItem(data.cartItems);
          }
        },
      });
    }
  }
  let productItem;
  if (props.product) {
    productItem = (
      <li className={classes.cart}>
        <div className={classes.productInfo}>
          <aside>
            <img src={props.product.imageUrl} alt="" />
          </aside>
          <div>
            <h3>Name:{props.product.title}</h3>
            <p>Price:{props.product.price}</p>
          </div>
        </div>
        <div>
          <p>{props.product.description}</p>
        </div>
        <div className={classes.productAction}>
          <h3>Quantity:{props.product.quantity}</h3>
          <input ref={inputRef} type="number" min="1" max="5" />
          <p>
            Total Price:
            {(props.product.quantity! * props.product.price).toFixed(2)}
          </p>
          <Button onClick={removeItemFromCartHandler}>Delete</Button>
        </div>
      </li>
    );
  }
  return <>{productItem}</>;
};

export default CartItem;
