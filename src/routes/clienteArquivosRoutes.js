import express from "express";
import clienteArquivoController from "../controllers/clienteArquivosController.js";

const router = express.Router()

//Rotas
router
    .get("/clientearquivos",clienteArquivoController.lerclientesArquivos)
    .post("/clientearquivos",clienteArquivoController.criarclienteArquivos)
export default router