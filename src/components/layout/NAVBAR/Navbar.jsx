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
            src="https://res.cloudinary.com/deg6afpqs/image/upload/v1728253484/logo-removebg-preview_qvfwj2.png"
            alt=""
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </Link>
        <ul className="links">
          <Link to="/"> Todas las Notebooks </Link>
          <Link to="/category/gamer">Notebooks Gamers</Link>
          <Link to="/category/trabajo">Notebooks de Trabajo</Link>
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
