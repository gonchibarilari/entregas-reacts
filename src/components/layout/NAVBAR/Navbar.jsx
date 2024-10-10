import { CartWidget } from "../../common/cartWidget/CartWidget";
import "./navbar.css";
export const Navbar = () => {
  return (
    <>
      <div className="container-navbar">
        <img
          src="https://img.bekiabelleza.com/marcas/th/0000/300.jpg"
          alt="logo"
        />
        <h2>ALISARTE TUCUMAN</h2>
        <div>
          <ul className="link-navbar">
            <li>SHAMPOO</li>
            <li>ACONDICIONADOR</li>
            <li>CREMAS</li>
          </ul>
        </div>
        <CartWidget />
      </div>
    </>
  );
};
