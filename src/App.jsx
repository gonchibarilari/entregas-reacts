import { Footer } from "./components/layout/FOOTER/Footer";
import ItemListContainer from "./components/layout/ITEMLISTCONTAINER/ItemListContainer";
import { Navbar } from "./components/layout/NAVBAR/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ItemListContainer />
      <Footer />
    </div>
  );
}

export default App;
