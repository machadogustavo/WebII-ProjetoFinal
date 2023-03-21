import express from "express";

import formArquivosClientesController from "../controllers/formArquivosClientesController.js";
import multerUpload from "../config/multer.js";
const router = express.Router() 


// Rotas

router
    .get("/form",formArquivosClientesController.lerArquivoClienteAll)
    .get("/form/clienteArquivo/:arquivoClienteId",formArquivosClientesController.lerArquivoClientePorId)
    .get("/form/email/:emailCliente", formArquivosClientesController.lerArquivosPorEmailCliente )
    .get("/form/id/:idCliente", formArquivosClientesController.lerArquivosPorIDCliente )
    
    .post("/form", multerUpload.array('files'),formArquivosClientesController.criarArquivoCliente)
    
    .put("/form/arquivoStatus/:arquivoClienteId",formArquivosClientesController.editarStatusclienteArquivo)


    .delete("/form/delete/:arquivoId",formArquivosClientesController.deletarArquivoPorId)
    .delete("/form/deleteimpressos",formArquivosClientesController.deletarArquivosImpressos)
    .delete("/deleteall",formArquivosClientesController.deletarAll)
export default router