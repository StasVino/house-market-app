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

//Re-route into images router
//const imageRouter = require("./imageRoutes");
//router.use("/:listingId/images", imageRouter);

router.route("/").get(protect, getAllListings).post(protect, createListing);
router.route("/profile").get(protect, getUserListings);

router
  .route("/:id")
  .get(protect, getListing)
  .delete(protect, deleteListing)
  .put(protect, updateListing);

module.exports = router;
