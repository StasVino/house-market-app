const mongoose = require('mongoose');
const listingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    type: {
      type: String,
      required: [true, 'Sell or Rent?'],
      enum: ['sale', 'rent'],
    },
    name: {
      type: String,
      required: [true, 'Please provide the name of the house you wish to list'],
    },
    landlordName: {
      type: String,
      required: [true, 'Please add landlord name'],
    },
    landlordEmail: {
      type: String,
      required: [true, 'Please add an landlord email'],
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide number of bedrooms'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide number of bathrooms'],
    },
    parking: {
      type: Boolean,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    address: {
      type: String,
      required: [true, 'Please provide the adress of the house'],
      unique: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: [true, 'Please provide the lising price'],
    },
    discountedPrice: {
      type: Number,
      required: [true, 'Please provide the discounted listing price'],
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    images: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Listing', listingSchema);
