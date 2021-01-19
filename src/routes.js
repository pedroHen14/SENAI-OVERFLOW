const express = require("express");

const authMiddleware = require("./middleware/authorization");
const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

const routes = express.Router();

//rotas publicas 
routes.post("/sessions", sessionController.store);
routes.post("/students", studentController.store);

routes.use(authMiddleware)

//rotas de alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rotas de perguntas
routes.post("/questions", questionController.store);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post("/questions/:id/answers", answerController.store);

//rota feed
routes.get("/feed", feedController.index);

module.exports = routes;