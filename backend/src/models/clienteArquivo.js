import mongoose from "mongoose";

const clienteArquivoSchema = new mongoose.Schema(

    {
        cliente: {type: mongoose.Schema.Types.ObjectId,ref: 'cliente', require: true},
        arquivo: {type: mongoose.Schema.Types.ObjectId,ref: 'arquivo', require: true},
        impressoStatus: {type: Boolean, default: false}
    },
    {
        versionKey: false
    }

)

const clienteArquivos = mongoose.model('clientesArquivos',clienteArquivoSchema)

export default clienteArquivos