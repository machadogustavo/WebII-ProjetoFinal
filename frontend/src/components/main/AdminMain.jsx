import React from "react";
import { useState, useEffect } from "react";
import { deletarArquivoPorId } from "../../js/deleteArquivo.js";
import { ImpressoStatus } from "../../js/impressoStatus.js";
import { renderArquivo } from "../../js/renderArquivo.js";

const AdminMain = () => {
  const [clientes, setClientes] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [lastClientes, setLastClientes] = useState([]);
  const [arquivoURL, SetArquivoURL] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/clientes")
      .then((response) => response.json())
      .then((clientes) => {
        // Verifica se houve mudanças na lista de clientes
        if (JSON.stringify(lastClientes) !== JSON.stringify(clientes)) {
          setClientes(clientes);
          setLastClientes(clientes);
          console.log(clientes);

          // Percorre todos os clientes e faz a chamada fetch para cada um
          for (let i = 0; i < clientes.length; i++) {
            let idCliente = clientes[i]._id;
            fetch(`http://localhost:3001/form/id/${idCliente}`)
              .then((response) => response.json())
              .then((data) => {
                setArquivos(data);
              })
              .catch((error) => {
                console.error(error);
              });
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [lastClientes]);

  console.log(arquivos);

  return (
    <main id="admin">
      <div className="container-flex">
        {clientes.map((cliente) => (
          <div key={cliente._id}>
            <header>
              <h2>{cliente.emailCliente}</h2>
              <h6>{cliente.nomeCliente}</h6>
              <h6>{cliente.telefoneCliente}</h6>
            </header>
            {arquivos
              .filter((arquivo) => arquivo.cliente === cliente._id)
              .map((arquivo) => (
                <div key={arquivo._id}>
                  <div>
                    <i className="fa-sharp fa-regular fa-folder"></i>
                    <p id={cliente._id}>
                      {arquivo.arquivo.nomeArquivo}{" "}
                      {`${(
                        arquivo.arquivo.tamanhoArquivo /
                        (1024 * 1024)
                      ).toFixed(2)} MB`}
                      <br />
                      {arquivo.impressoStatus ? "Impresso" : "Não Impresso"}
                    </p>
                  </div>
                  <i className="fa-solid fa-trash-can">
                    <button
                      onClick={() => deletarArquivoPorId(arquivo.arquivo._id)}
                    >
                      Deletar
                    </button>
                  </i>
                  <i className="fa-solid fa-trash-can">
                    <button onClick={() => renderArquivo(arquivo._id)}>
                      {/* {<iframe src={data} width="100%" height={600}/>} */}
                      Download Arquivo / Imprimir / Visualizar
                    </button>
                  </i>
                  <i className="fa-solid fa-trash-can">
                    <button onClick={() => ImpressoStatus(arquivo._id)}>
                      Mudar Status
                    </button>
                  </i>
                </div>
              ))}
            {arquivos.filter((arquivo) => arquivo.cliente === cliente._id)
              .length === 0 && (
              <div>
                <p>Carregando arquivos desse cliente.</p>
              </div>
            )}
          </div>
        ))}
        {clientes.length === 0 && (
          <div>
            <header>
              <h2>Sem clientes :'(</h2>
            </header>
          </div>
        )}
        {clientes.length !== 0 &&  (
          <div>
            <header>
              <h2>Clientes:</h2>
            </header>
            {clientes.map((cliente) => (
              <div key={cliente.id} className="cliente">
                {console.log(cliente._id)}
                  <div>
                    <div>
                      <i class="fa-solid fa-user"></i>
                      <p>{cliente.nomeCliente}</p>
                    </div>
                    <p>{cliente.emailCliente}</p>
                    <p>{cliente.telefoneCliente}</p>
                </div>
                <i className="fa-solid fa-trash-can"></i>
              </div>
            ))}
          </div>
        )}  
      </div>
    </main>
  );
};

export default AdminMain;
