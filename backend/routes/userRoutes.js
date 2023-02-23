const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/update", updateUser);

module.exports = router;
