import express from "express";
import arquivosController from "../controllers/arquivosController.js";
import multerUpload from "../config/multer.js";
const router = express.Router()

//Rotas
router
    .get("/arquivos",arquivosController.lerArquivos)
    .get("/arquivos/:id",arquivosController.lerArquivoId)
    .post("/arquivos",multerUpload.single('arquivo'),arquivosController.criarArquivo)
    .put("/arquivos/:id",multerUpload.single('arquivo'),arquivosController.editarArquivo)
    .delete("/arquivos/:id",arquivosController.deletarArquivo)
export default router