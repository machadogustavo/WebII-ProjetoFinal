import express from 'express' // Importando Biblioteca Express
import dbConnect from './config/dbConnect.js' // Importando módulo conexão
import routes from './routes/index.js' // Importando index.js
import cors from "cors";


// Tratamento de erro conexão BD
dbConnect.on("error",console.log.bind(console, "Erro na conexão ao banco de dados."))


dbConnect.once("open", () => {
    console.log("Conexão com o banco de dados realiza com sucesso.");
})



const app = express()
app.set('view engine','ejs')
app.use(express.json())
app.use(cors())

routes(app)


export default app