const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype === "image/jpeg") {
      return {
        filename: "file_" + Date.now(),
        bucketName: "photos",
      };
    } else {
      return null;
    }
  },
});

module.exports = multer({ storage });
