import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Snackbar,
  Alert,
} from "@mui/material";
import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../context/firebaseConfig/firebaseConfig";

const Checkout = () => {
  const { cart, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const order = {
        buyer: formData,
        items: cart.map((product) => ({
          id: product.id,
          title: product.title,
          quantity: product.quantity,
          price: product.price,
        })),
        total: getTotalPrice(),
        date: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "orders"), order);
      setOrderId(docRef.id);

      for (const product of cart) {
        const productRef = doc(db, "products", product.id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const currentStock = productSnapshot.data().stock;
          const newStock = currentStock - product.quantity;

          if (newStock >= 0) {
            await updateDoc(productRef, { stock: newStock });
          } else {
            console.warn(
              `Stock insuficiente para el producto: ${product.title}`
            );
          }
        } else {
          console.error(
            `Producto con ID ${product.id} no encontrado en la base de datos.`
          );
        }
      }

      clearCart();
    } catch (error) {
      console.error("Error al guardar la orden o actualizar el stock: ", error);
    }
  };

  const handleCancel = () => {
    clearCart();
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={3}>
      {orderId ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          mt={5}
          width="100%"
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Gracias por tu compra
          </Typography>
          <Typography variant="h6">
            Se ha generado un número de ticket: <strong>{orderId}</strong>.
          </Typography>
          <Typography variant="body1">
            Se te enviará un e-mail con factura y detalle de la compra.
          </Typography>
        </Box>
      ) : (
        <>
          <Box flexBasis="60%" display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5">Formulario de Compra</Typography>
            <TextField
              label="Nombre y Apellido"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Número de Teléfono"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              fullWidth
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Comprar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
          <Box flexBasis="35%">
            <Typography variant="h6" gutterBottom>
              Chequea los datos antes de comprar
            </Typography>
            {cart.map((product) => (
              <Card key={product.id} sx={{ mb: 2 }}>
                <CardMedia
                  component="img"
                  image={product.image || "/path/to/placeholder.jpg"}
                  alt={product.title}
                  sx={{ height: 100, width: "100%", objectFit: "contain" }}
                />
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {product.description}
                  </Typography>
                  <Typography variant="body1">
                    Precio Unitario: U$S {product.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body1">
                    Cantidad: {product.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Subtotal: U$S{" "}
                    {(product.price * product.quantity).toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Typography variant="h5" mt={2}>
              Total a Pagar: U$S {getTotalPrice().toFixed(2)}
            </Typography>
          </Box>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          Se ha cancelado la compra
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Checkout;
