const express = require("express");
const router = express.Router();
const {
  getUserListings,
  getAllListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(protect, getAllListings)
  .post(protect, upload.single("image"), createListing);
router.route("/profile").get(protect, getUserListings);

router
  .route("/:id")
  .get(protect, getListing)
  .delete(protect, deleteListing)
  .put(protect, updateListing);

module.exports = router;
