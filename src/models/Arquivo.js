import mongoose from "mongoose";

const arquivoSchema = new mongoose.Schema(


    {
        nomeArquivo: {type: String},
        arquivo: {type: Buffer, require: true},
        tipoArquivo: {type: String}
    },
    {
        versionKey: false
    }
)

const arquivos = mongoose.model('arquivo', arquivoSchema)

export default arquivos