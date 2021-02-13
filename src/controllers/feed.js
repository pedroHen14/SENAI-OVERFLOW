const Answer = require("../models/Answer");
const Student = require("../models/Student");
const Question = require("../models/Question");
const { Op } = require("sequelize");

module.exports = {
  async index(req, res) {
    const keyWord = req.query.word;
    try {
      // const feedao = await Question.findAll();

      // const json = JSON.parse(JSON.stringify(feedao));

      // const feed = json.map(async (j) => {
      //   const feeda = await Question.findByPk(j.id);
      //   console.log(JSON.stringify(JSON.parse(feeda)));
      //   return feeda;
      // });

      // const nada = await feed.getCategories();

      if (!keyWord) {
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
          // limit: 5,
          // subQuery: false,
        });
        res.send(feed);
      } else {
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
      }

      // console.log(feedLength);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
