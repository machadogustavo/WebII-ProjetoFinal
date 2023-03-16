import React from "react";
import { useState } from "react";

const AdminMain = () => {
  fetch("http://localhost:3000/form").then((response) => {
    response.json().then((dados) => {
      dados.map((cliente) => {
        console.log(cliente);
      });
    });
  });

  const [data, setData] = useState([]);

  fetch("http://localhost:3000/form")
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch((error) => {
      console.error(error);
    });

  return (
    <div id="tableArquivoCliente">
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th>Nome Arquivo</th>
            {/* <th>Arquivo</th> */}
            <th>Tamanho</th>
            {/* <th>Tipo Arquivo</th> */}
            <th>Impresso?</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item.cliente.nomeCliente}</td>
              <td>{item.cliente.telefoneCliente}</td>
              <td>{item.cliente.emailCliente}</td>
              <td>{item.arquivo.nomeArquivo}</td>
              {/* <td>{item.arquivo.tipoArquivo}</td> */}
              <td>
                {(item.arquivo.tamanhoArquivo / (1024 * 1024)).toFixed(2) +
                  " MB"}
              </td>
              <td>{item.impressoStatus ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMain;
