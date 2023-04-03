import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deletarArquivoPorId } from "../../js/deleteArquivo";
import { deletarClientePorId } from "../../js/deletarClientePorId";
import { ImpressoStatus } from "../../js/impressoStatus";
import { renderArquivo } from "../../js/renderArquivo.js";

import { ImageConfig } from "../../config/ImageConfig";

const ClienteMain = () => {
  const { idCliente } = useParams();
  const navigate = useNavigate();
  console.log("ID CLIENTE ATUAL: ", idCliente);

  const [arquivos, setArquivos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);

  useEffect(() => {
    fetch(`http://localhost:3001/clientes/${idCliente}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("CLIENTE ATUAL: ", data);
        setCliente(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`http://localhost:3001/form/id/${idCliente}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ARQUIVOS: ", data);
        setArquivos(data);
      })
      .catch((error) => {
        alert.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <main id="cliente">
        <div className="container-flex">
          <header>
            <div>
              <i className="fa-solid fa-user"></i>
              <h2>Carregando Cliente :)</h2>
            </div>
          </header>
        </div>

        <div className="clienteArquivo">
          <div>
            <div>
              <div>
                <p>Carregando arquivos do cliente...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="cliente">
      <div className="container-flex">
        <header>
          <div>
            <i className="fa-solid fa-user"></i>
            <h2>{cliente.nomeCliente}</h2>
          </div>
          <h3>{cliente.telefoneCliente}</h3>
          <h3>{cliente.emailCliente}</h3>
          <h3>
            {" "}
            {arquivos.filter((arquivo) => arquivo.cliente === cliente._id)
              .length + " Arquivo(s)"}
          </h3>
          <i
            className="fa-solid fa-trash-can"
            onClick={async () => {
              await deletarClientePorId(cliente._id);
              navigate("/admin");
            }}
          ></i>
        </header>
        <div className="clienteArquivo">
          {arquivos.filter((item) => item.cliente === cliente._id).length ===
          0 ? (
            <div className="clienteArquivo">
              <p>Este cliente não possui arquivos</p>
            </div>
          ) : (
            arquivos
              .filter((arquivo) => arquivo.cliente === cliente._id)
              .map((arquivo) => (
                <div key={arquivo._id}>
                  {/* {console.log(arquivo.arquivo.tipoArquivo)} */}
                  <div>
                    {ImageConfig[arquivo.arquivo.tipoArquivo.split("/")[1]] ||
                      ImageConfig["default"]}
                    <p>
                      {arquivo.arquivo.nomeArquivo+arquivo.arquivo.extensaoArquivo} <br></br>
                      {`${(
                        arquivo.arquivo.tamanhoArquivo /
                        (1024 * 1024)
                      ).toFixed(2)} MB`}
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
                      onClick={() => renderArquivo(arquivo.arquivo._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => deletarArquivoPorId(arquivo.arquivo._id)}
                    ></i>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  );
};

export default ClienteMain;
