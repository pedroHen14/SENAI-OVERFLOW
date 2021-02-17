const Question = require("../models/Question");
const Student = require("../models/Student");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const keyWord = req.query.word;
    try {
      const search = await Question.findAll({
        where: {
          [Op.or]: {
            title: { [Op.like]: `%${keyWord}%` },
            description: { [Op.like]: `%${keyWord}%` },
          },
        },
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "gist",
          "created_at",
        ],
        include: [
          {
            association: "Student",
            attributes: ["id", "name", "image"],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "created_at"],
            include: {
              association: "Student",
              attributes: ["id", "name", "image"],
            },
          },
          {
            association: "Categories",
            through: {
              attributes: [],
            },
            attributes: ["id", "description"],
          },
        ],
      });

      res.send(search);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async store(req, res) {
    const { title, description, gist, categories } = req.body;

    const categoriesArray = categories.split(",");

    const { studentId } = req;

    try {
      //buscar o aluno pelo ID
      let student = await Student.findByPk(studentId);

      //se aluno não existir, retorna erro
      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      //crio a pergunta para o aluno
      let question = await student.createQuestion({
        title,
        description,
        image: req.file ? req.file.firebaseUrl : null,
        gist,
      });

      await question.addCategories(categoriesArray);

      //retorno sucesso
      res.status(201).send({
        id: question.id,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        gist: question.gist,
        image: req.file ? req.file.firebaseUrl : null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  find(req, res) {},

  async update(req, res) {
    const questionId = req.params.id;

    const { title, description } = req.body;

    const { studentId } = req;

    try {
      const question = await Question.findByPk(questionId);

      if (!question)
        return res.status(404).send({ error: "Questão não encontrada" });

      if (question.StudentId != studentId)
        return res.status(401).send({ error: "Não autorizado" });

      question.title = title;
      question.description = description;

      question.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const questionId = req.params.id;

    const { studentId } = req;

    try {
      const question = await Question.findOne({
        where: {
          id: questionId,
          student_id: studentId,
        },
      });

      if (!question) res.status(404).send({ error: "Questão não encontrada" });

      await question.destroy();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
