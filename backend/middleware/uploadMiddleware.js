const multer = require("multer");

const upload = multer({
  dest: "/uplods",
});

module.exports = { upload };
