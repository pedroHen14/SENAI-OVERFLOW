//importa o express
const express = require("express");
const { errors } = require("celebrate");

//importa as rotas
const routes = require("./routes");

const cors = require("cors");
const Category = require("./models/Category");
const Question = require("./models/Question");

require("./database");

//cria a aplicação express
const app = express();

app.use(express.json());

app.use(cors());

//definimos a pasta uploads como pública, servindo arquivos estaticos
app.use("/uploads", express.static("uploads"));

app.use(routes);

app.use(errors());

module.exports = app;

for (let assoc of Object.keys(Question.associations)) {
  for (let accessor of Object.keys(Question.associations[assoc].accessors)) {
    console.log(
      Question.name +
        "." +
        Question.associations[assoc].accessors[accessor] +
        "()"
    );
  }
}
