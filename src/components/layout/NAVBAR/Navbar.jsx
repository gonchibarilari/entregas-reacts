import { WiDayThunderstorm } from "react-icons/wi";
import { CartWidget } from "../../common/cartWidget/CartWidget";
import "./navbar.css";
// Para
export const Navbar = () => {
  const stylesImage = {
    margin: "10px",
    width: "50px",
  };
  return (
    <>
      <div className="container-navbar">
        <img
          src="https://img.bekiabelleza.com/marcas/th/0000/300.jpg"
          alt="logo"
          style={stylesImage}
        />
        <h2>ALISARTE TUCUMAN</h2>
        <div>
          <ul className="link-navbar">
            <li>INICIO</li>
            <li>PRODUCTOS</li>
            <li>SERVICIOS</li>
            <li>CONOCENOS</li>
          </ul>
        </div>
        <CartWidget />
      </div>
    </>
  );
};
