import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

export const CartWidget = () => {
  const { cart } = useCart();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link to="/cart">
      <FaShoppingCart />
      {totalItems > 0 && <span>{totalItems}</span>}{" "}
    </Link>
  );
};
