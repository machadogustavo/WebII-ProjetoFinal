import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Alerts from '../Alert/Alerts';

import getClientesArquivos from "../../js/get-requests/getClientesArquivos";

import { deletarArquivosCheck } from "../../js/delete-requests/deleteArquivosCheck";
import { deletarClientePorId } from "../../js/delete-requests/deletarClientePorId";

const AdminMain = () => {
  // alerts
  const [alertDelCliente, setAlertDelCliente] = useState(false)
  const [clienteDel, setClienteDel] = useState('')
  // states
  const [clientes, setClientes] = useState([]);
  const [arquivos, setArquivos] = useState([]);
  const [lastClientes, setLastClientes] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);
  const [reqError, setReqError] = useState([false]);
  const navigate = useNavigate();

  useEffect(() => {
    getClientesArquivos(
      setClientes,
      setLastClientes,
      setArquivos,
      setIsLoading,
      setReqError,
      lastClientes
    );
  }, [lastClientes]);

  console.log("ARQUIVOS CLIENTES =>>", arquivos);

  return (
    <main id="admin">
      <div className="container-flex">
        {alertDelCliente ? <Alerts
          type={'Alerta'}
          content={`Remover o cliente [${clienteDel}] e todos seus arquivos?`}
          func={setAlertDelCliente}
          res={true}
          anyFunc={
            async () => {
              await deletarClientePorId(clienteDel, setClientes);
              navigate("/admin");
            }
          }
        /> : null}
        <button
          className="btn-primary btn-color-blue"
          onClick={async () => {
            deletarArquivosCheck();
            getClientesArquivos(
              setClientes,
              setLastClientes,
              setArquivos,
              setIsLoading,
              setReqError,
              lastClientes
            );
          }}
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
                  onClick={() => (setAlertDelCliente(true), setClienteDel(cliente._id))}
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
