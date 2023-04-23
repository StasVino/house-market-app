const multer = require("multer");
const asyncHandler = require("express-async-handler");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    console.log(file);
    cb(null, __dirname, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(req);
    console.log(file);
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
