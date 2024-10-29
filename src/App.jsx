import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartContainer from "./components/pages/cart/CartContainer";
import ItemDetailContainer from "./components/pages/itemDetail/ItemDetailContainer";
import Navbar from "./components/layout/NAVBAR/Navbar";
import { ItemListContainer } from "./components/pages/ITEMLISTCONTAINER/ItemListContainer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:name" element={<ItemListContainer />} />
          <Route path="/cart" element={<CartContainer />} />
          <Route path="/itemDetail/:id" element={<ItemDetailContainer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
