import express from "express";
import formArquivosClientesController from "../controllers/formArquivosClientesController.js";
import multerUpload from "../config/multer.js";
const router = express.Router()

// Rotas

router  
    .get("/form", formArquivosClientesController.lerArquivoClienteAll)
    .get("/form/nome/:nomeCliente", formArquivosClientesController.lerArquivosPorNomeCliente )
    
    .post("/form", multerUpload.single('arquivo'),formArquivosClientesController.criarArquivoCliente)
    
    
    
    
    
    .delete("/form/deleteimpressos",formArquivosClientesController.deletarArquivosImpressos)
    .delete("/deleteall",formArquivosClientesController.deletarAll)
export default router