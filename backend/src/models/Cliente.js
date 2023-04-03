import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema(

    {
        nomeCliente: {type: String, require: true},
        telefoneCliente: {type: String},
        emailCliente: {type: String, require: true}
    },
    {
        versionKey: false
    }
)

const clientes = mongoose.model('cliente', clienteSchema)

export default clientes