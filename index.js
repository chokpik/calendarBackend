//DBUSER: mern_user
//DBPASS: jrxugNQiyZT8v7Iu
const express = require("express");
require("dotenv").config(); // Necesario para las variables de entorno
const { dbConnection } = require("./database/config");
const cors = require("cors");

// Crear servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public")); // el express.use() es un middleware

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", require("./routes/auth"));

//TODO: CRUD: Eventos

app.use("/api/events", require("./routes/events"));

//Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriento en puerto ${process.env.PORT}`);
});
