const express = require("express");
const router = express.Router();
const {
  getUserListings,
  getCategoryListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router
  .route("/category/:name")
  .get(getCategoryListings)
  .post(protect, upload.single("image"), createListing);
router.route("/profile").get(protect, getUserListings);

router
  .route("/:id")
  .get(getListing)
  .delete(protect, deleteListing)
  .put(protect, updateListing);

module.exports = router;
