const multer = require("multer");
const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log("this is upload");
    cb(null, file.originalname + Date.now());
  },
});

const upload = multer({
  storage: storage,
});

module.exports = upload;
