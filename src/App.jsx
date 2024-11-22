import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import CartContainer from "./components/pages/cart/CartContainer";
import { Navbar } from "./components/layout/navbar/Navbar";
import ItemDetailContainer from "./components/pages/itemDetail/ItemDetailContainer";
import { CartProvider } from "./context/CartContext";
import Checkout from "./components/pages/checkout/Checkout";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        {/* Barra de navegación */}
        <Navbar />

        {/* Rutas de la aplicación */}
        <Routes>
          {/* Página principal: Listado de productos */}
          <Route path="/" element={<ItemListContainer />} />

          {/* Ruta para productos filtrados por categoría */}
          <Route path="/category/:name" element={<ItemListContainer />} />

          {/* Carrito de compras */}
          <Route path="/cart" element={<CartContainer />} />

          {/* Detalles de un producto */}
          <Route path="/itemDetail/:id" element={<ItemDetailContainer />} />

          {/* Página de checkout */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
