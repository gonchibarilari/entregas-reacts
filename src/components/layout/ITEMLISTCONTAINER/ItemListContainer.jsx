import "./ItemListContainer.css";
import { articulos } from "../../../product";
import { useEffect, useState } from "react";
import Card from "../../common/CARD/Card"; // Asegúrate de que la exportación sea correcta

let myArticulosPromise = new Promise((res, rej) => {
  setTimeout(() => {
    if (articulos.length === 0) {
      rej("productos vacíos");
    } else {
      res(articulos);
    }
  }, 2500);
});

export const ItemListContainer = () => {
  const [myArticulos, setMyArticulos] = useState([]);

  useEffect(() => {
    myArticulosPromise
      .then((data) => {
        setMyArticulos(data); // Guardar los artículos en el estado
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("SIEMPRE SE EJECUTA");
      });
  }, []);

  return (
    <div className="list-container">
      {myArticulos.map((articulo) => (
        <Card
          key={articulo.id}
          title={articulo.title} // Corrige el nombre de las propiedades
          stock={articulo.stock}
        />
      ))}
    </div>
  );
};

export default ItemListContainer;
