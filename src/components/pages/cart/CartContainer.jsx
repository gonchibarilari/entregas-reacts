import React from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

const CartContainer = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="subtitle1" color="textSecondary">
          No tienes productos en el carrito.
        </Typography>
      ) : (
        cart.map((product) => (
          <Card
            key={product.id}
            sx={{
              display: "flex",
              alignItems: "center",
              width: 300,
              mb: 2,
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <CardMedia
              component="img"
              image={product.image ? product.image : "/path/to/placeholder.jpg"}
              alt={product.name ? product.name : "Producto"}
              sx={{ width: 100, height: 100, objectFit: "cover", m: 1 }}
            />
            <CardContent>
              <Typography variant="h6">{product.title}</Typography>
              <Typography variant="body1">
                Precio: U$S{" "}
                {product.price ? product.price.toFixed(2) : "No disponible"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Cantidad: {product.quantity}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}

      <Typography variant="h6" mt={2}>
        Total a Pagar: U$S {getTotalPrice().toFixed(2)}
      </Typography>
      <Box display="flex" justifyContent="center" mt={2} gap={2}>
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Finalizar compra
        </Button>
        {/* Renderiza el botón solo si el carrito no está vacío */}
        {cart.length > 0 && (
          <Button variant="outlined" color="secondary" onClick={clearCart}>
            Quitar productos del carrito
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default CartContainer;
