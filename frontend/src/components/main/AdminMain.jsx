import React from "react";
import { useState, useEffect } from "react";
import { deletarClientePorId } from "../../js/deleteCliente.js";
import { Link } from "react-router-dom";
import { deletarArquivosCheck } from "../../js/deleteArquivosCheck.js";


const AdminMain = () => {
  const [clientes, setClientes] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [lastClientes, setLastClientes] = useState([]);

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
        <button onClick={() => deletarArquivosCheck()}>
          <h1>
            Deletar Arquivos Impressos <i className="fa-solid fa-trash-can"></i>
          </h1>
        </button>
        {/* {clientes.map((cliente) => (
          <div key={cliente._id}>
            <header id={cliente._id}>
              <h2>{cliente.emailCliente}</h2>
              <h3>{cliente.nomeCliente}</h3>
              <h3>{cliente.telefoneCliente}</h3>
            </header>
            {arquivos
              .filter((arquivo) => arquivo.cliente === cliente._id)
              .map((arquivo) => (
                <div key={arquivo._id}>
                  <div>
                    <i className="fa-sharp fa-regular fa-folder"></i>
                    <p>
                      {arquivo.arquivo.nomeArquivo} <br></br>
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
                      onClick={() => renderArquivo(arquivo._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => deletarArquivoPorId(arquivo.arquivo._id)}
                    ></i>
                  </div>
                </div>
              ))}
            {arquivos.filter((arquivo) => arquivo.cliente === cliente._id)
              .length === 0 && (
              <div>
                <div>
                  <p>O cliente não possui arquivos.</p>
                </div>
              </div>
            )}
          </div>
        ))} */}
        {clientes.length === 0 && (
          <div>
            <header>
              <h2>Sem clientes :'(</h2>
            </header>
          </div>
        )}
        {clientes.length !== 0 && (
          <div>
            <header>
              <h2>Clientes:</h2>
            </header>
            {clientes.map((cliente) => (
              <div key={cliente.id} className="cliente">
                <div>
                  <div>
                    <Link to={`/admin/cliente/${cliente._id}`}>
                      <i class="fa-solid fa-user"></i>
                      <a href={"#" + cliente._id}>{cliente.nomeCliente}</a>
                    </Link>
                  </div>
                  <p>{cliente.emailCliente}</p>
                  <p>{cliente.telefoneCliente}</p>
                  <p>
                    {arquivos.filter(
                      (arquivo) => arquivo.cliente === cliente._id
                    ).length + " Arquivo"}
                  </p>
                </div>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => deletarClientePorId(cliente._id)}
                ></i>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminMain;
