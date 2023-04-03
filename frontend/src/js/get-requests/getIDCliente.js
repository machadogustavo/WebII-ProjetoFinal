import axios from "axios";

export const getIDCliente = (idCliente, setCliente) => {
  axios
    .get(`http://localhost:3001/clientes/${idCliente}`)

    .then((response) => {
      console.log("CLIENTE ATUAL: ", response.data);
      setCliente(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

