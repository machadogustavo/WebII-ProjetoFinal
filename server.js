import app from "./src/app.js" // Importando módulo app

const port = process.env.port || 2500

app.listen(port, () => {

    console.log(`Servidor Web UP: http://localhost:${port}`);

})