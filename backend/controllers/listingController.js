const asyncHandler = require("express-async-handler");

const Listing = require("../models/listingModel");

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    Get user listing
// @route   GET /api/listing
// @access  Private
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user: req.user.id });

  res.status(200).json(listings);
});

// @desc    Get user listing
// @route   GET /api/listings/:id
// @access  Private
const getListing = asyncHandler(async (req, res) => {
  const listing = await listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (listing.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(listing);
});

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
const createListing = asyncHandler(async (req, res) => {
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    adress,
    offer,
    RegularPrice,
    DiscountedPrice,
  } = req.body;
  console.log(req.body);
  if (!name || !adress) {
    res.status(400);
    throw new Error("Please enter a name and adress");
  }

  const listing = await Listing.create({
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    adress,
    offer,
    RegularPrice,
    DiscountedPrice,
    user: req.user.id,
  });
  res.status(201).json(listing);
});

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (listing.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await listing.remove();

  res.status(200).json({ success: true });
});

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = asyncHandler(async (req, res) => {
  const listing = await listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("listing not found");
  }

  if (listing.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedListing);
});

module.exports = {
  getListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
};
