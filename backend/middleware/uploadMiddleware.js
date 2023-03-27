const multer = require("multer");

const upload = asyncHandler(async (req, file, cb) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  console.log(storage);
  return multer({ storage: storage });
});

module.exports = { upload };
