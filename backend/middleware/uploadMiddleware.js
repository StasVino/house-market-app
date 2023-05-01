const multer = require("multer");
const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("this is upload middleware", file);
    cb(null, file.originalname + Date.now());
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = upload;
