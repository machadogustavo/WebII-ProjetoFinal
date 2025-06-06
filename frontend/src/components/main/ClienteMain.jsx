import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import deletarArquivoPorId from "../../js/delete-requests/deletarArquivoPorId";

import { deletarClientePorId } from "../../js/delete-requests/deletarClientePorId";
import { ImpressoStatus } from "../../js/put-requests/impressoStatus";
import { downloadArquivo } from "../../js/get-requests/downloadArquivo.js";

import { ImageConfig } from "../../config/ImageConfig";

import { getIDCliente } from "../../js/get-requests/getIDCliente";
import { getArquivosIDCliente } from "../../js/get-requests/getArquivosIDCliente";
import Alerts from "../Alert/Alerts";

const ClienteMain = () => {
  // alerts
  const [alertImpressao, setAlertImpressao] = useState(false);
  const [alertDel, setAlertDel] = useState(false);
  const [arquivoIdDel, setArquivoIdDel] = useState(false);

  const [selectedArquivo, setSelectedArquivo] = useState(null);

  const { idCliente } = useParams();
  const navigate = useNavigate();
  console.log("ID CLIENTE ATUAL: ", idCliente);

  const [arquivos, setArquivos] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [isLoading, setIsLoading] = useState([true]);

  useEffect(() => {
    getIDCliente(idCliente, setCliente);

    setIsLoading(true);
    getArquivosIDCliente(idCliente, setArquivos, setIsLoading);
  }, [idCliente, setArquivos, setIsLoading]);

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
      {alertImpressao ? (
        <Alerts
          type={"Sucesso"}
          content={`Status de impressão alterado com sucesso!`}
          func={setAlertImpressao}
          time={true}
        />
      ) : null}
      {alertDel ? (
        <Alerts
          type={"Alerta"}
          content={`Deseja Excluir o Arquivo: ${arquivoIdDel}?`}
          func={setAlertDel}
          res={true}
          anyFunc={async () => {
            await deletarArquivoPorId(arquivoIdDel, setArquivos);
          }}
        />
      ) : null}
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
              await deletarClientePorId(cliente._id, setCliente);
              navigate("/admin");
            }}
          ></i>
        </header>
        <div className="clienteArquivo">
          {arquivos.filter((item) => item.cliente === cliente._id).length ===
          0 ? (
            <p>Este cliente não possui arquivos</p>
          ) : (
            arquivos
              .filter((arquivo) => arquivo.cliente === cliente._id)
              .map((arquivo) => (
                <div key={arquivo._id}>
                  <div>
                    {ImageConfig[arquivo.arquivo.tipoArquivo.split("/")[1]] ||
                      ImageConfig["default"]}
                    <p>
                      {arquivo.arquivo.nomeArquivo +
                        arquivo.arquivo.extensaoArquivo}{" "}
                      <br></br>
                      {`${(
                        arquivo.arquivo.tamanhoArquivo /
                        (1024 * 1024)
                      ).toFixed(2)} MB`}
                      <br></br>
                      {"Data Envio: " +
                        new Date(arquivo.arquivo.dataArquivo).toLocaleString()}
                      <br></br>
                      <span className={`print-stats ${arquivo.impressoStatus == "Impresso" ? "print-stats__true" : "print-stats__false"}`}>{arquivo.impressoStatus ? "Impresso" : "Não Impresso"}</span>
                    </p>
                  </div>
                  <div>
                    <i
                      className="fa-solid fa-check-to-slot"
                      onClick={async () => {
                        setAlertImpressao(true);
                        await ImpressoStatus(arquivo._id, setArquivos);
                        getArquivosIDCliente(
                          idCliente,
                          setArquivos,
                          setIsLoading
                        );
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-file-arrow-down"
                      onClick={() => downloadArquivo(arquivo.arquivo._id, 2)}
                    ></i>
                    <i
                      className="fa-solid fa-print"
                      onClick={() => downloadArquivo(arquivo.arquivo._id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => {
                        setArquivoIdDel(arquivo.arquivo._id), setAlertDel(true);
                      }}
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
