const Multer = require("multer");

const uploadQuestions = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    let alowedTypes = ["image/png", "image/jpeg"];

    if (alowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo do arquivo invalido"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = uploadQuestions.single("image");
