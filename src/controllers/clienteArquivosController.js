import clienteArquivos from "../models/clienteArquivo.js";

// CRUD

class clienteArquivoController {

    // CREATE - POST
    static criarclienteArquivos = (req, res) => {
        let clienteArquivo = new clienteArquivos(req.body)
        clienteArquivo.save((error) => {
            if (error) {
             res.status(500).send({message: `${error.message} - Erro ao cadastrar o cliente-arquivo.`})
            }
             else {
             res.status(201).send(clienteArquivo.toJSON())
            }
    })
    }
    // READ - GET
    static lerclienteArquivos = (req, res) => {
        clienteArquivos.find()
        .populate([
            {path: 'cliente'},

            {path: 'arquivo', 
            select: 'nomeArquivo'},
        ])
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
    static lerclienteArquivosId = (req, res) => {
        let idclientesArquivo = req.params.id
        clienteArquivos.findById(idclientesArquivo)
        .populate([
            {path: 'cliente'},

            {path: 'arquivo', 
            select: 'nomeArquivo'},
        ])
        .exec((error, clienteArquivo) => {
            if(error) {
                res.status(400).send({message: `${error.message} - Erro ao buscar cliente-arquivo.`})
            }
            else{
                res.status(200).json(clienteArquivo)
            }
        })
    }
    // UPDATE - PUT
    static editarclienteArquivos = (req, res) => {
        let idclientesArquivo = req.params.id
        clienteArquivos.findByIdAndUpdate(idclientesArquivo, {$set: req.body}, (error => {
            if(error){
                res.status(500).send({message: `${error.message} - Erro ao editar o cliente-arquivo`})
            }
            else{
                res.status(200).send({message: "Coleção cliente-arquivo editado com sucesso."})
            }
        }))
    }
    // DELETE - DELETE
    static deletarclienteArquivos = (req, res) =>{
        let idclientesArquivo = req.params.id
        clienteArquivos.findByIdAndDelete(idclientesArquivo, (error) => {

            if(!error) {
                res.status(200).send({message: 'Registro removido com sucesso.'})
            }
            else{
                res.status(500).send({message: `${error.message} - Erro ao deletar.`})
            }
        })
    }

}

export default clienteArquivoController