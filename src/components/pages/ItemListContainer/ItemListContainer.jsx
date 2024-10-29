import { useState } from "react";
import { useEffect } from "react";
import { products } from "../../../products";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList.jsx";
export const ItemListContainer = () => {
  const { name } = useParams();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const unaFraccion = products.filter(
      (producto) => producto.category === name
    );
    const getProducts = new Promise((resolve) => {
      resolve(name ? unaFraccion : products);
    });
    getProducts.then((res) => {
      setItems(res);
    });
  }, [name]);
  return <ItemList items={items} />;
};
