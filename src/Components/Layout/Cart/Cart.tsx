import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useAppSelector, useAppDispatch } from "../../../store";
import Card from "../../UI/Card";
import useApi from "../../../customHooks/useApi";
import { useEffect, useState } from "react";
import Product from "../../../Interfaces/Product";
const Cart: React.FC<props> = (props) => {
  const [reset, setReset] = useState([1]);
  const [cartUser, setCartUser] = useState<Product[]>();
  const userId = useAppSelector((state) => state.auth).userId;
  const apiHook = useApi();
  useEffect(() => {
    apiHook(import.meta.env.VITE_API_GET_CART + userId, {
      useData(data) {
        setCartUser(data.cartItems);
      },
    });
  }, [reset]);
  function removeCartItemHandler(cartItems: Product[]) {
    if (reset[0] == 1) {
      setReset([0]);
    } else {
      setReset([1]);
    }
    setCartUser(cartItems);
  }
  function addOrderHandler() {
    apiHook(import.meta.env.VITE_API_POST_ADD_ORDER, {
      method: "POST",
      body: {
        userId: userId,
      },
      headers: {
        "Content-Type": "Application/json",
      },
      useData(data) {
        setReset([2]);
      },
    });
  }
  if (cartUser && cartUser.length > 0) {
    const productList = cartUser.map((item) => {
      return (
        <CartItem
          onRemoveItem={removeCartItemHandler}
          key={item.product_id}
          product={item}
        />
      );
    });
    if (productList.length == 0) {
      return <section className={classes.cart}>No Item found!</section>;
    } else {
      let totalPrice = 0;
      cartUser.map((product) => {
        if (product && product.quantity)
          totalPrice += product.price * product.quantity;
      });
      return (
        <Card>
          <main className={classes.cart}>
            <div className={classes.filledUpSpace}>
              <div className={classes.titleCart}>Your Cart:</div>
              <div className={classes.listOfProducts}>
                <ul className={classes.holdProducts}>{productList}</ul>
              </div>
            </div>
            <div className={classes.total}>
              <div className="partOfTotal">
                <h1>Total Price:{totalPrice}</h1>
              </div>
              <div className="partOfTotal">
                <Button onClick={addOrderHandler}>Order!</Button>
              </div>
            </div>
          </main>
        </Card>
      );
    }
  } else {
    return <section className={classes.cart}>No Item found!</section>;
  }
};
export default Cart;
