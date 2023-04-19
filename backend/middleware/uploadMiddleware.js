const multer = require("multer");
const asyncHandler = require("express-async-handler");
const { GridFsStorage } = require("multer-gridfs-storage");
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    console.log("sheery");

    return {
      filename: "file_" + Date.now(),
      bucketName: "photos",
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
