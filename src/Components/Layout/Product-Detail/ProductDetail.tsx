import props from "../../../Interfaces/Props";
import Button from "../../UI/Button";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import Recommend from "./Recommend";
import { Params } from "../../../Interfaces/Params";
import useApi from "../../../customHooks/useApi";
import Product from "../../../Interfaces/Product";
import Card from "../../UI/Card";
const ProductDetail: React.FC<props> = (props) => {
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const apiHook = useApi();
  const productId = useParams<Params>().productId;
  const userId = useAppSelector((state) => state.auth).userId;
  useEffect(() => {
    apiHook(import.meta.env.VITE_API_GET_PRODUCT_DETAIL + productId, {
      useData(data) {
        setProduct(data.product);
      },
    });
  }, [productId]);
  function addQuantityHandler() {
    setQuantity(quantity + 1);
  }
  function minusQuantityHandler() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }
  function addToCartHandler(): void {
    apiHook(import.meta.env.VITE_API_PUT_ADD_TO_CART, {
      method: "put",
      body: {
        productId: productId,
        quantity: quantity,
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  let price = 0;
  const changeQuantityHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement;
    if (+value.value <= -1) {
      return;
    }
    setQuantity(+value.value);
  };
  let productElement;
  if (product) {
    price = product.price * quantity;
    productElement = (
      <article className={classes.article}>
        <div className={classes.productImage}>
          <img src={product.imageUrl} alt={product.description} />
        </div>
        <div className={classes.productInfo}>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <div className={classes.focus}>
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity">
              <button onClick={minusQuantityHandler} className={classes.button}>
                -
              </button>
              <input
                className={classes.input}
                value={quantity}
                onChange={changeQuantityHandler}
                type="text"
              />
              <button onClick={addQuantityHandler} className={classes.button}>
                +
              </button>
            </div>
            <i>{price.toFixed(2)}$</i>
          </div>
          <Button onClick={addToCartHandler}>Add To Cart</Button>
        </div>
      </article>
    );
  } else {
    productElement = <p>Loading!</p>;
  }
  return (
    <Card>
      {productElement}
      <Recommend product={product} />
    </Card>
  );
};
export default ProductDetail;
