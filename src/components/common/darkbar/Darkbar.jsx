// Darkbar.jsx
import React from "react";
import { FaEye } from "react-icons/fa";

export const Darkbar = ({ toggleDarkMode }) => {
  return (
    <span onClick={toggleDarkMode} className="dark-mode-icon">
      <FaEye />
    </span>
  );
};
