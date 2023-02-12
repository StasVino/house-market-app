const mongoose = require("mongoose");

const listingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      required: [true, "Sell or Rent?"],
      enum: ["Sell", "Rent"],
    },
    name: {
      type: String,
      required: [true, "Please provide the name of the house you wish to list"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please provide number of bedrooms"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please provide number of bathrooms"],
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    adress: {
      type: String,
      required: [true, "Please provide the adress of the house"],
    },
    offer: {
      type: Boolean,
      required: true,
    },
    RegularPrice: {
      type: Number,
      required: [true, "Please provide the lising price"],
    },
    DiscountedPrice: {
      type: Number,
      required: [true, "Please provide the discounted listing price"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Listing", listingSchema);
