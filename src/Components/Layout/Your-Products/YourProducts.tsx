import { useEffect, useState } from "react";
import props from "../../../Interfaces/Props";
import Products from "../../Products/Products";
import useApi from "../../../customHooks/useApi";
import { useAppSelector } from "../../../store";
import Product from "../../../Interfaces/Product";
import { useParams } from "react-router";
import { Params } from "../../../Interfaces/Params";
const YourProducts: React.FC<props> = (props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const userId = useParams<Params>().userId;
  const [reset, setReset] = useState([]);
  const apiHook = useApi();
  useEffect(() => {
    apiHook(import.meta.env.VITE_API_GET_YOUR_PRODUCTS + userId, {
      useData(data) {
        if (data && data.products) setProducts(data.products);
      },
    });
  }, [reset]);

  function onDeleteHandler(productId: string) {
    apiHook(import.meta.env.VITE_API_DELETE_PRODUCT, {
      method: "DELETE",
      body: {
        productId: productId,
        userId: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      setReset([]);
    });
  }
  return (
    <Products
      linkPage={`your-products/${userId}`}
      deleteProduct={onDeleteHandler}
      pagination={true}
      editProduct={true}
      products={products}
    />
  );
};

export default YourProducts;
