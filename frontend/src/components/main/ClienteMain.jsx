import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { deletarArquivoPorId } from "../../js/deleteArquivo.js";
import { ImpressoStatus } from "../../js/impressoStatus.js";
import { renderArquivo } from "../../js/renderArquivo.js";
import { deletarClientePorId } from "../../js/deleteCliente.js";

const ClienteMain = () => {
  const { idCliente } = useParams();
  console.log("ID CLIENTE ATUAL: ", idCliente);

  const [arquivos, setArquivos] = useState([]);
  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/clientes/${idCliente}`)
      .then((response) => response.json())
      .then((data) => {
        setCliente(data);
        console.log(cliente);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`http://localhost:3001/form/id/${idCliente}`)
      .then((response) => response.json())
      .then((data) => {
        setArquivos(data);
        console.log(arquivos);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <main id="cliente">
      <Link to={"/admin"}>Voltar</Link>

      <div className="clienteInfo">
        <h1>{cliente.nomeCliente}</h1>
        <h1>{cliente.telefoneCliente}</h1>
        <h1>{cliente.emailCliente}</h1>
        <i
          className="fa-solid fa-trash-can"
          onClick={() => deletarClientePorId(cliente._id)}
        ></i>
      </div>

      <div className="clienteArquivo">
        {arquivos
          .filter((arquivo) => arquivo.cliente === cliente._id)
          .map((arquivo) => (
            <div key={arquivo._id}>
              <div>
                <i className="fa-sharp fa-regular fa-folder"></i>
                <p>
                  {arquivo.arquivo.nomeArquivo} <br></br>
                  {`${(arquivo.arquivo.tamanhoArquivo / (1024 * 1024)).toFixed(
                    2
                  )} MB`}
                  <br></br>
                  {"Data Envio: " +
                    new Date(arquivo.arquivo.dataArquivo).toLocaleString()}
                  <br></br>
                  {arquivo.impressoStatus ? "Impresso" : "Não Impresso"}
                </p>
              </div>
              <div>
                <i
                  className="fa-solid fa-check-to-slot"
                  onClick={() => ImpressoStatus(arquivo._id)}
                ></i>
                <i
                  className="fa-solid fa-print"
                  onClick={() => renderArquivo(arquivo._id)}
                ></i>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deletarArquivoPorId(arquivo.arquivo._id)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default ClienteMain;
