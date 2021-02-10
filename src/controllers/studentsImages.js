const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils");
const { store } = require("./students");

module.exports = {
  async store(req, res) {
    const { firebaseUrl } = req.file;
    const { studentId } = req;

    if (!firebaseUrl)
      return res.status(400).send({ error: "Campo imagem é obrigatório" });

    try {
      let student = await Student.findByPk(studentId);

      if (!student)
        return res.status(404).send({ error: "Aluno não encontrado" });

      student.image = firebaseUrl;

      student.save();

      res.status(201).send({
        studentId: studentId,
        image: firebaseUrl,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
