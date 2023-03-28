// URL de conexão do Mongo DB Atlas: 'mongodb+srv://admin:bmA6KShRFW86gf9@cluster0.fkajhnv.mongodb.net/WebIIProject'
// Mongoose Password: bmA6KShRFW86gf9

import mongoose from "mongoose"; //Importando Biblioteca Mongoose

mongoose.set("strictQuery", true);

// connect mongo atlas
// mongoose.connect(`mongodb+srv://admin:bmA6KShRFW86gf9@cluster0.fkajhnv.mongodb.net/WebIIProject`)

// connect mongodb localhost
mongoose.connect("mongodb://127.0.0.1/WebIIProject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnect = mongoose.connection;

export default dbConnect; // Exportando módulo de conexão
