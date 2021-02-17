const Answer = require("../models/Answer");
const Student = require("../models/Student");
const Question = require("../models/Question");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const page = (req.query.page - 1) * 5;

    try {
      if (!req.query.page) {
        const feed = await Question.findAll({
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "gist",
            "created_at",
            "StudentId",
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
          order: [["created_at", "DESC"]],
        });

        res.send(feed);
      } else {
        const feedPage = await Question.findAll({
          attributes: [
            "id",
            "title",
            "description",
            "image",
            "gist",
            "created_at",
            "StudentId",
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
          order: [["created_at", "DESC"]],
          offset: page,
          limit: 5,
        });
        res.send(feedPage);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
