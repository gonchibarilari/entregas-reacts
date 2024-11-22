import React, { useState, useEffect } from "react"; // Importación correcta y única
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";
import { Box, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { db } from "../../../context/firebaseConfig/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { products } from "../../../products"; // Asegúrate de que esta importación sea necesaria

export const ItemListContainer = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Primero, filtramos los productos estáticos (si existen) por categoría
    const unaFraccion = products.filter(
      (producto) => producto.category === name
    );

    // Utilizamos una promesa para decidir si usamos productos estáticos o Firestore
    const getProducts = new Promise((resolve) => {
      resolve(name ? unaFraccion : products);
    });

    // Cuando obtenemos la promesa, actualizamos el estado
    getProducts.then((res) => {
      setItems(res);
    });

    setLoading(true); // Indicamos que los datos están siendo cargados

    // Función asincrónica para obtener los productos de Firestore
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredProducts = name
          ? allProducts.filter((producto) => producto.category === name)
          : allProducts;
        setItems(filteredProducts); // Actualizamos el estado con los productos filtrados
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setLoading(false); // Indicamos que la carga ha finalizado
      }
    };

    fetchProducts(); // Llamamos a la función para obtener los productos
  }, [name]); // El efecto solo se ejecutará cuando el valor de 'name' cambie

  // Renderizamos el contenido
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ fontFamily: "sans-serif", textAlign: "center", mb: 2 }}
      >
        <h2>Listado de productos</h2>
      </Typography>

      <Box
        display="flex"
        justifyContent="space-around"
        flexWrap="wrap"
        width="100%"
      >
        {loading ? (
          [...Array(6)].map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 210,
                padding: 2,
                boxShadow: 2,
                borderRadius: 2,
                m: 1,
              }}
            >
              <Skeleton variant="rectangular" width={200} height={150} />
              <Skeleton variant="text" width={140} height={30} sx={{ mt: 1 }} />
              <Skeleton variant="text" width={100} height={25} />
              <Skeleton variant="text" width={80} height={25} />
              <Skeleton
                variant="rectangular"
                width={130}
                height={35}
                sx={{ mt: 1 }}
              />
            </Box>
          ))
        ) : (
          <ItemList items={items} /> // Una vez que los datos se cargan, mostramos los productos
        )}
      </Box>
    </Box>
  );
};
