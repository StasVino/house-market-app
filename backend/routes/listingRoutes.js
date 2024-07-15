const express = require("express");
const router = express.Router();
const {
  getUserListings,
  getCategoryListings,
  getOfferListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
} = require("../controllers/listingController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createListing);
router.route("/category/:page").get(getCategoryListings);
router.route("/offers/:page").get(getOfferListings);
router.route("/profile").get(protect, getUserListings);

router
  .route("/:id")
  .get(getListing)
  .delete(protect, deleteListing)
  .put(protect, updateListing);

module.exports = router;
