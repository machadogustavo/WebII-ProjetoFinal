import express from "express";

import formArquivosClientesController from "../controllers/formArquivosClientesController.js";
import multerUpload from "../config/multer.js";
const router = express.Router() 
import cors from "cors";

// Rotas

router.use(cors())
    .get("/form",formArquivosClientesController.lerArquivoClienteAll)
    .get("/form/nome/:nomeCliente", formArquivosClientesController.lerArquivosPorNomeCliente )
    
    .post("/form", multerUpload.array('files'),formArquivosClientesController.criarArquivoCliente)
    
    

    .delete("/form/deleteimpressos",formArquivosClientesController.deletarArquivosImpressos)
    .delete("/deleteall",formArquivosClientesController.deletarAll)
export default router