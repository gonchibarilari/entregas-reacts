import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
export const CartWidget = () => {
  return (
    <Link to="/cart">
      <FaShoppingCart />
      <span>0</span>
    </Link>
  );
};

export default CartWidget;
