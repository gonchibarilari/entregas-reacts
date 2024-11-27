import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { Box, Typography } from "@mui/material";
import { db } from "../../../context/firebaseConfig/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const ItemListContainer = () => {
  const { name } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

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

        setItems(filteredProducts);
      } catch (error) {
        console.error("Error al obtener productos de Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [name]);

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
          <ItemList items={items} />
        )}
      </Box>
    </Box>
  );
};
