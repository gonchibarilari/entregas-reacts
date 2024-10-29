import { useEffect, useState } from "react";
const FetchingData = () => {
  const [arrayUsuarios, setArrayUsuarios] = useState([]);
  useEffect(() => {
    const getUsers = fetch("https://jsonplaceholder.typicode.com/users");
    let arrayUsuarios = undefined;
    getUsers
      .then((res) => res.json())
      .then((usuarios) => {
        setArrayUsuarios(usuarios);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const getUsers = fetch("https://jsonplaceholder.typicode.com/users/2");
    getUsers
  }, []);
  return (
    <div>
      <h1>Aca los usuarios</h1>
      {arrayUsuarios.map((usuario) => {
        return (
          <div>
            <h1>{usuario.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default FetchingData;
