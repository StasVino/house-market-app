const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: [true, "Sell or Rent?"],
      enum: ["Sell", "Rent"],
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
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
    parking: {
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
      required: [true, "Please provide your name"],
    },
    DiscountedPrice: {
      type: Number,
      required: [true, "Please provide your name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
