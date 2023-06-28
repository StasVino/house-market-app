const asyncHandler = require("express-async-handler");
const Listing = require("../models/listingModel");

// NOTE: no need to get the user, we already have them on req object from
// protect middleware. The protect middleware already checks for valid user.

// @desc    create user listing
// @route   GET /api/listing
// @access  Private
const getUserListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user: req.user.id });
  res.status(200).json(listings);
});

// @desc    Get all listings
// @route   GET /api/listings
const getAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.status(200).json(listings);
});

// @desc    Get user listing
// @route   GET /api/listings/:id
// @access  Private
const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
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
    landlordName,
    landlordEmail,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
  } = req.body;
  //const { path: image } = req.file;
  if (!name || !address) {
    res.status(400);
    throw new Error("Please enter a condo name and adress");
  }

  const listing = await Listing.create({
    type,
    name,
    landlordName,
    landlordEmail,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
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
  const listing = await Listing.findById(req.params.id);
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
  getUserListings,
  getAllListings,
  getListing,
  createListing,
  deleteListing,
  updateListing,
};
