import express from 'express' // Importando Biblioteca Express

// Importação das Rotas a serem usadas
import clientes from './clientesRoutes.js'
import arquivos from './arquivosRoutes.js'
import clienteArquivos from './clienteArquivosRoutes.js'

const routes = (app) => {
    app.route('/').get((req,res,error) => {

        res.status(200).send({message: 'Servidor Web OK'})

    })

    app.use(
        express.json(),
        clientes,
        arquivos,
        clienteArquivos
    )
}

export default routes