const express = require("express");
const Multer = require("multer");

const multer = Multer();

const authMiddleware = require("./middleware/authorization");
// const uploadQuestions = require("./middleware/uploadQuestion");
const uploadImage = require("./services/firebase");

const studentValidator = require("./validators/studentValidator");
const questionValidator = require("./validators/questionValidator");
const answerValidator = require("./validators/answerValidator");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");

const routes = express.Router();

// const upload = multer.single("arquivo");

// routes.post("/uploads", upload, (req, res) => {

//     const handleError = (error) => {
//         if (error) {
//             res.status(400).send({error: "Arquivos invalido"})
//         }

//         console.log(req.file);

//         res.send(req.file);
//     }

//     upload(req, res, handleError);

// });

//rotas publicas
routes.post("/sessions", sessionController.store);
routes.post("/students", studentValidator.create, studentController.store);

routes.use(authMiddleware);

//rotas de alunos
routes.get("/students", studentController.index);
routes.get("/students/:id", studentController.find);
routes.delete("/students/:id", studentController.delete);
routes.put("/students/:id", studentController.update);

//rotas de perguntas
routes.post(
  "/questions",
  multer.single("image"),
  uploadImage,
  questionValidator.create,
  questionController.store
);
routes.delete("/questions/:id", questionController.delete);
routes.put("/questions/:id", questionController.update);

//rotas de respostas
routes.post(
  "/questions/:id/answers",
  answerValidator.create,
  answerController.store
);

//rota feed
routes.get("/feed", feedController.index);

module.exports = routes;
