import express from "express";
import clientesController from "../controllers/clientesController.js";

const router = express.Router()

//Rotas
router
    .get("/clientes",clientesController.lerClientes)
    .get("/clientes/nome/:nomeCliente",clientesController.letClienteNome)
    .get("/clientes/:id",clientesController.lerClienteId)
    .post("/clientes",clientesController.criarCliente)
    .put("/clientes/:id",clientesController.editarCliente)
    .delete("/clientes/:id",clientesController.deletarCliente)
export default router