import axios from "axios";

const getClientesArquivos = (setClientes, setLastClientes, setArquivos, setIsLoading, setReqError, lastClientes) => {
  setIsLoading(true);

  axios
    .get("http://localhost:3001/clientes")
    .then((response) => response.data)
    .then((clientes) => {
      // Verifica se houve mudanças na lista de clientes
      if (JSON.stringify(lastClientes) !== JSON.stringify(clientes)) {
        setClientes(clientes);
        setLastClientes(clientes);
        console.log('CLIENTES =>',clientes);

        // Percorre todos os clientes e faz a chamada fetch para cada um
        for (let i = 0; i < clientes.length; i++) {
          let idCliente = clientes[i]._id;
          axios
            .get(`http://localhost:3001/form/id/${idCliente}`)
            .then((response) => response.data)
            .then((data) => {
              setArquivos(data);
            })
            .catch((error) => {
              alert.error(error);
            });
        }
      }
      setIsLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setIsLoading(false);
      setReqError(true);
    });
};

export default getClientesArquivos