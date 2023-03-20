import express from "express";
import arquivosController from "../controllers/arquivosController.js";
import multerUpload from "../config/multer.js";
const router = express.Router()

import cors from "cors";

// Rotas

router.use(cors())
    .get("/arquivos",arquivosController.lerArquivos)
    .get("/arquivos/nome/:nomeArquivo",arquivosController.lerArquivoNome)
    .get("/arquivos/:id",arquivosController.lerArquivoId)
    .post("/arquivos",multerUpload.single('arquivo'),arquivosController.criarArquivo)
    .put("/arquivos/:id",multerUpload.single('arquivo'),arquivosController.editarArquivo)
    .delete("/arquivos/:id",arquivosController.deletarArquivo)
export default router