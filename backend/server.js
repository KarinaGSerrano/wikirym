// se importa express.js
const express = require("express");
const bodyParser = require("body-parser");

// se importa CORS
const cors = require("cors");

// se importan funciones propias de este backend
const data = require("./data.js");

// se instancia express y determina puerto del backend
const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar CORS para todos los puertos
app.use(cors());

// -----------------------------------------------------

// -----------------------------------------------------
// GET endpoint
app.get("/getPersuasion", (req, res) => {
  const respuesta = data.randomFrasePersuasiva();
  res.send(respuesta);
});
// -----------------------------------------------------

// -----------------------------------------------------
// POST consejos a Rick
app.post("/postAskRick", (req, res) => {
  const nombre = req.body.data;
  const respuesta = data.randomFraseRick(nombre);
  res.send(respuesta);
});
// -----------------------------------------------------

// Abrir el servidor
app.listen(port, () => {
  console.log(`Servidor abierto en http://localhost:${port}`);
});
