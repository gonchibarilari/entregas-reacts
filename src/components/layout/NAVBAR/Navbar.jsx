import "./navbar.css";
import { FaShoppingCart } from "react-icons/fa";

export const Navbar = () => {
  return (
    <>
      <div className="container-navbar">
        <h2>Nombr22e de la tienda</h2>
        <ul>
          <li>Shampoo</li>
          <li>ACONDICIONADOR</li>
          <li>CREMAS</li>
        </ul>
        <div>
          <FaShoppingCart />
          <span>0</span>
        </div>
      </div>
    </>
  );
};
