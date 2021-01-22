var admin = require("firebase-admin");

var serviceAccount = require("../config/firebase-key.json");

const BUCKET = "senai-overflow-bdfa3.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const Multer = require("multer");

const uploadQuestions = Multer({
  storage: Multer.memoryStorage({
    destination: "uploads/",
    filename: (req, file, callback) => {
      const filename = Date.now() + "." + file.originalname.split(".").pop();

      return callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    let allowedTypes = ["image/png", "image/jpeg"];

    if (allowedTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Tipo do arquivo invalido"));
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, //maximo de 2 megabytes
  },
});

module.exports = uploadQuestions.single("image");
