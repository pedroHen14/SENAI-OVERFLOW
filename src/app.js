//importa o express
const express = require("express");

//importa as rotas
const routes = require("./routes");

const { errors } = require("celebrate");

require("./database");

//cria a aplicação express
const app = express();

app.use(express.json());

//definimos a pasta uploads como pública, servindo arquivos estaticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());

module.exports = app;
