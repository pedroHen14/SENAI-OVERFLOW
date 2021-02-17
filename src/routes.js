const express = require("express");
const Multer = require("multer");

const multer = Multer();

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadSingleImage");
const uploadFirebase = require("./services/uploadFirebase");

const studentValidator = require("./validators/studentValidator");
const questionValidator = require("./validators/questionValidator");
const answerValidator = require("./validators/answerValidator");

const studentController = require("./controllers/students");
const questionController = require("./controllers/questions");
const answerController = require("./controllers/answers");
const feedController = require("./controllers/feed");
const sessionController = require("./controllers/sessions");
const categoriesController = require("./controllers/categories");
const studentImagesController = require("./controllers/studentsImages");

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
routes.post(
  "/students/:id/images",
  uploadSingleImage,
  uploadFirebase,
  studentImagesController.store
);

//rotas de perguntas
routes.get("/questions", questionController.index);
routes.post(
  "/questions",
  uploadSingleImage,
  uploadFirebase,
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

//rota de categorias
routes.get("/categories", categoriesController.index);

module.exports = routes;
