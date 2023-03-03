import props from "../../Interfaces/Props";
import classes from "./ProductItem.module.css";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import useApi from "../../customHooks/useApi";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { url } from "inspector";
const ProductItem: React.FC<props> = (props) => {
  const history = useHistory();
  const apiHook = useApi();
  if (props.product) {
    function onEditHandler() {
      if (props.product) {
        history.replace("/edit-product/" + props.product.product_id);
      }
    }
    function onDeleteHandler() {
      if (props.product && props.deleteProduct) {
        props.deleteProduct(props.product.product_id.toString());
      }
    }
    return (
      <article className={classes.article}>
        <div className={classes.productImage}>
          <img src={props.product.imageUrl} alt="" />
        </div>
        <div className={classes.product}>
          <div className={classes.productId}>
            <h1>{props.product.title.slice(0, 30)}...</h1>
            <p>{props.product.description.slice(0, 70)}...</p>
          </div>

          <div className={classes.action}>
            <code>{props.product.price}$</code>
            {props.editProduct ? (
              <>
                <Button onClick={onEditHandler}>Edit</Button>
                <Button onClick={onDeleteHandler}>Delete</Button>
              </>
            ) : (
              <Link
                className={classes.details}
                to={`/products/${props.product.product_id}`}
              >
                Details
              </Link>
            )}
          </div>
        </div>
      </article>
    );
    // );
  } else {
    return <></>;
  }
};

export default ProductItem;
