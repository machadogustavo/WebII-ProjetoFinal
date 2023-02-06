import clienteArquivos from "../models/clienteArquivo.js";

// CRUD

class clienteArquivoController {

    // CREATE - POST
    static criarclienteArquivos = (req, res) => {
        let clienteArquivo = new clienteArquivos(req.body)
        clienteArquivo.save((error) => {
            if (error) {
             res.status(500).send({message: `${error.message} - Erro ao cadastrar o arquivo-cliente.`})
            }
             else {
             res.status(201).send(clienteArquivo.toJSON())
            }
    })
    }
    // READ - GET
    static lerclientesArquivos = (req, res) => {
    clienteArquivos.find()
    // .populate([{path: 'cliente', select: 'nomeCliente', select: 'emailCliente'},{path: 'arquivo', select: 'nomeArquivo', select: 'tipoArquivo'}, ])
    .exec((error, clienteArquivo) => {
        if(error){
            res.status(400).send({message: `${error.message} - Erro ao ler a tabela clienteArquivo`})
        }
        else{
            res.status(200).json(clienteArquivo)
        }
    })
    }

    // READ² - GET


    // UPDATE - PUT

    // DELETE - DELETE



}



export default clienteArquivoController