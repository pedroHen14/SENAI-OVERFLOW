const Answer = require("../models/Answer");
const Student = require("../models/Student");
const Question = require("../models/Question");

module.exports = {
  async index(req, res) {
    try {
      const feed = await Question.findAll({
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
        order: [["created_at", "DESC"]],
        // offset: 5,
        limit: 5,
        subQuery: false,
      });

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
