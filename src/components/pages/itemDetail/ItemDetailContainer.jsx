import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { products } from "../../../products";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const foundItem = products.find((product) => product.id === id);
    setItem(foundItem);
  }, [id]);

  return item ? (
    <ItemDetail
      title={item.title}
      description={item.description}
      imageUrl={item.imageUrl}
    />
  ) : null;
};

export default ItemDetailContainer;
