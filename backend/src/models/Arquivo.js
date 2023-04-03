import mongoose from "mongoose";

const arquivoSchema = new mongoose.Schema(


    {
        nomeArquivo: {type: String},
        arquivo: {type: Buffer, require: true},
        dataArquivo: {type: Date},
        tipoArquivo: {type: String},
        extensaoArquivo : {type: String},
        tamanhoArquivo: {type: Number, require: true},
        cliente: {type: mongoose.Schema.Types.ObjectId,ref: 'cliente'},
    },
    {
        versionKey: false
    }
)

const arquivos = mongoose.model('arquivo', arquivoSchema)

export default arquivos