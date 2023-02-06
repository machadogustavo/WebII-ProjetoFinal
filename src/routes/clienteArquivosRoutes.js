import express from "express";
import clienteArquivoController from "../controllers/clienteArquivosController.js";

const router = express.Router()

//Rotas
router
    .get("/clientearquivos",clienteArquivoController.lerclienteArquivos)
    // .get("/clientearquivos/:busca",clienteArquivoController.lerclientePorArquivo) //FUNÇÃO BUSCA POR ARQUIVO VINCULADO A CLIENTE
    .get("/clientearquivos/:id",clienteArquivoController.lerclienteArquivosId)
    .post("/clientearquivos",clienteArquivoController.criarclienteArquivos)
    .put("/clientearquivos/:id",clienteArquivoController.editarclienteArquivos)
    .delete("/clientearquivos/:id",clienteArquivoController.deletarclienteArquivos)
export default router