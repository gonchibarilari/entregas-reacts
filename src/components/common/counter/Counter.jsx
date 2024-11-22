import { useState } from "react";

const Counter = ({ stock, agregarAlCarrito }) => {
  // 10 - 10
  const [contador, setContador] = useState(0);

  const sumar = () => {
    // if (stock > contador) {
    //   setContador(contador + 1);
    // } else {
    //   alert("stock maximo");
    // }
    stock > contador ? setContador(contador + 1) : alert("stock maximo");
  };
  const restar = () => {
    setContador(contador - 1);
  };

  return (
    <div
      style={{
        margin: "50px",
      }}
    >
      <button onClick={sumar}>sumar</button>
      <h2>Contador = {contador}</h2>
      <button onClick={restar}>restar</button>
      <h1>
        {" "}
        swl
        <h1></h1>
      </h1>
      <link rel="stylesheet" href=" " />

      <button onClick={() => agregarAlCarrito(contador)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default Counter;
