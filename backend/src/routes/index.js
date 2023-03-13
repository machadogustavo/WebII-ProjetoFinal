import express from "express"; // Importando Biblioteca Express

// Importação das Rotas a serem usadas
import clientes from "./clientesRoutes.js";
import arquivos from "./arquivosRoutes.js";
import clienteArquivos from "./clienteArquivosRoutes.js";
import formArquivosClientes from "./formArquivosClientesRoutes.js"

const routes = (app) => {
  app.route("/").get((req, res, error) => {
    res.render("index");
  });

  app.use(express.json(), clientes, arquivos, clienteArquivos, formArquivosClientes);


};

export default routes;
