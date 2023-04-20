const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const database = mongoose.connect(process.env.MONGO_URI);

const storage = new GridFsStorage({
  db: database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log("sherry");
    return {
      filename: file.originalname + Date.now(),
      bucketName: "image",
    };
  },
});

upload = multer({ storage });
module.exports = upload;

// const storage = asyncHandler(async (req, res) =>
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//       console.log(file);
//       cb(null, file.originalname + Date.now());
//     },
//   })
// );

// const upload = multer({
//   storage,
// });
