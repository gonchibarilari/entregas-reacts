import React, { useState } from "react";
import "./ItemDetail.css";
import { Button, Box, Typography } from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemDetail = ({ id, title, description, imageUrl, price, stock }) => {
  const { addProduct, cart } = useCart();
  const [contador, setContador] = useState(0);

  const isStockMaxReached = () => {
    const productInCart = cart.find((item) => item.id === id);
    return productInCart ? productInCart.quantity >= stock : false;
  };

  const incrementar = () => {
    if (contador < stock && !isStockMaxReached()) {
      setContador(contador + 1);
    }
  };

  const decrementar = () => {
    if (contador > 0) {
      setContador(contador - 1);
    }
  };

  const handleAddToCart = () => {
    if (contador > 0 && !isStockMaxReached()) {
      addProduct(
        {
          id,
          title,
          image: imageUrl,
          price,
          stock,
        },
        contador
      );
      toast.success("Productos agregados al carrito", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });
      setContador(0);
    } else if (isStockMaxReached()) {
      toast.error("Stock máximo alcanzado", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="item-detail">
      <ToastContainer />
      <h1 className="item-title">{title}</h1>
      <Typography variant="h1" component="p">
        Precio: U$S{price}
      </Typography>
      <Typography variant="h2" component="p">
        Stock disponible: {stock}
      </Typography>
      <img src={imageUrl} alt={title} className="item-image" />
      <p className="item-description">{description}</p>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          marginTop: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: "40px" }}
          onClick={incrementar}
          disabled={contador >= stock || isStockMaxReached()}
          style={{ backgroundColor: isStockMaxReached() ? "gray" : "" }}
        >
          +
        </Button>
        <Typography variant="h6" component="span">
          {contador}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: "40px" }}
          onClick={decrementar}
          disabled={contador <= 0}
        >
          -
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "capitalize",
            fontSize: "1rem",
          }}
          onClick={handleAddToCart}
          disabled={contador === 0 || isStockMaxReached()}
        >
          Agregar carrito
        </Button>
      </Box>
    </div>
  );
};

export default ItemDetail;
