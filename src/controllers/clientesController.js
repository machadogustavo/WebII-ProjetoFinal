import clientes from "../models/Cliente.js";

class clientesController {
  // CRUD

//   CREATE - POST
    static criarCliente = (req, res) => {
    let cliente = new clientes(req.body);
    cliente.save((error) => {

      if (!error) {

        res.status(201).send({message: `O cliente foi cadastrado com sucesso!`});

      } else {
        res.status(500).send({message:`${error.message} - Erro ao cadastrar o cliente.`})
      }
    });
    };


// READ - GET
    static lerClientes = (req, res) => {
        clientes.find((error, clientes) => {

            if(error) {
                res.status(404).send({message: 'Erro ao ler a tabela clientes'})
            }
            else{
                res.status(200).json(clientes)
            }
        })
    }


// READ² - GET
    static lerClienteId = (req, res) => {
    let idCliente = req.params.id
    clientes.findById(idCliente, (error, cliente) => {

        if(error) {
            res.status(400).send({message: `${error.message} - Erro ao buscar cliente.`})
        }

        else{
            res.status(200).json(cliente)
        }
    })
}

// UPDATE - PUT
    static editarCliente = (req, res) => {
        let idCliente = req.params.id
        clientes.findByIdAndUpdate(idCliente, {$set: req.body}, (error) => {
            if(error){
                res.status(500).send({message: "Erro ao editar o cliente"})
            }
            else{
                res.status(200).send({message:"Cliente editado com sucesso."})
            }
        })
    }

// DELETE - DELETE
    static deletarCliente = (req, res) => {
        let idCliente = req.params.id
        clientes.findByIdAndDelete(idCliente, (error) => {
            
            if(!error) {
                res.status(200).send({message: `O cliente com o id: ${idCliente} foi removido com sucesso.`})
            }
            else {
                res.status(500).send({message: `${error.message} - Erro ao deletar cliente.`})
            }
        })
    }
}


export default clientesController