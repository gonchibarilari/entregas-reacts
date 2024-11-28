import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import "./Card.css";

export const Card = ({ title, price, stock, image, id }) => {
  const { addProduct, cart } = useCart();

  const agregarproductoalcarrito = () => {
    addProduct({ id, title, price, stock, image });
  };

  const sistockmaximo = (id) => {
    const productoencarrito = cart.find((item) => item.id === id);
    return productoencarrito ? productoencarrito.quantity >= stock : false;
  };

  return (
    <div className="card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <h3>{price} U$S</h3>
      <Link to={`/itemDetail/${id}`}>
        <button>Ver detalle</button>
      </Link>
    </div>
  );
};
