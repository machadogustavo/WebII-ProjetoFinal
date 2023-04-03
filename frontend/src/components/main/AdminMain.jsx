import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate  } from "react-router-dom";

import axios from "axios";

import { deletarArquivosCheck } from "../../js/deleteArquivosCheck";
import { deletarClientePorId } from "../../js/deletarClientePorId";

const AdminMain = () => {
  const [clientes, setClientes] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [lastClientes, setLastClientes] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [lastClientes]);

  console.log('ARQUIVOS CLIENTES =>>',arquivos);

  return (
    <main id="admin">
      <div className="container-flex">
        <button
          className="btn-primary btn-color-blue"
          onClick={() => deletarArquivosCheck()}
        >
          <p>
            Deletar Todos Arquivos Impressos{" "}
            <i className="fa-solid fa-trash-can"></i>
          </p>
        </button>
        {isLoading && (
          <div>
            <header>
              <h2>Carregando clientes...</h2>
            </header>
          </div>
        )}
        {!isLoading && clientes.length === 0 && (
          <div>
            <header>
              <h2>Sem clientes :'(</h2>
            </header>
          </div>
        )}
        {!isLoading && clientes.length !== 0 && (
          <div>
            <header>
              <h2>Clientes:</h2>
            </header>
            {clientes.map((cliente) => (
              <div key={cliente.id} className="cliente">
                <div>
                  <div>
                    <Link to={`/admin/cliente/${cliente._id}`}>
                      <i className="fa-solid fa-user"></i>
                      {cliente.nomeCliente}
                    </Link>
                  </div>
                  <p>{cliente.emailCliente}</p>
                  <p>{cliente.telefoneCliente}</p>
                  <p>
                    {arquivos.filter(
                      (arquivo) => arquivo.cliente === cliente._id
                    ).length + " Arquivo(s)"}
                  </p>
                </div>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={async () => {
                    await deletarClientePorId(cliente._id);
                    navigate("/admin");
                  }}
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
