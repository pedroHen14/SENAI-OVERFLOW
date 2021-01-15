const express = require("express");

const alunoController = require("./controllers/alunos");
const perguntaController = require("./controllers/perguntas");
const respostaController = require("./controllers/answers");

const routes = express.Router();

/*************************ROTAS DE ALUNOS*******************************/

//configuração da rota - GET
routes.get("/alunos", alunoController.listarAlunos);

//configuração da rota - GET pelo ID
routes.get("/alunos/:id", alunoController.buscarAluno);

//configuração da rota - POST
routes.post("/alunos", alunoController.adicionarAlunos);

//configuração da rota - DELETE
routes.delete("/alunos/:id", alunoController.deletarAluno);

//configuração da rota - PUT
routes.put("/alunos/:id", alunoController.editarAluno);

/*************************ROTAS DE PERGUNTAS*******************************/

routes.get("/perguntas/:id", perguntaController.index)

routes.post("/perguntas", perguntaController.store);

routes.put("/perguntas/:id", perguntaController.update);

routes.delete("/perguntas/:id", perguntaController.delete);

/**************************ROTAS DE RESPOSTAS****************************/

routes.post("/perguntas/:id/respostas", respostaController.store);

module.exports = routes;