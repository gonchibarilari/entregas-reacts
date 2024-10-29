// Navbar.jsx
import React, { useState } from "react";

import { Darkbar } from "../../common/darkbar/Darkbar";
import { Link } from "react-router-dom";
import CartWidget from "../../common/cartWidget/CartWidget";
import "./Navbar.css";

export const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <nav className={`nav ${darkMode ? "dark-mode" : ""}`}>
        <Link to="/">
          <img
            src="https://img.freepik.com/foto-gratis/mujer-joven-talla-media-cabello-rizado_23-2151317376.jpg?t=st=1730242444~exp=1730246044~hmac=3926ac8960eb1519f9d3f0cdd81dbd047a67c67ecef47066a8411eac916c425b&w=740"
            alt=""
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </Link>
        <ul className="links">
          <Link to="/"> PRODUCTOS </Link>
          <Link to="/category/gamer">ACONDICIONADOR</Link>
          <Link to="/category/trabajo">SHAMPOO</Link>
        </ul>

        <div className="nav-icons">
          <Darkbar toggleDarkMode={toggleDarkMode} />
          <CartWidget />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
