import axios from "axios";

const API_URL = "/api/listings/";

// Create new listing
const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, listingData, config);
  console.log(response);

  return response.data;
};

// Get user listings
const getListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user listing
const getListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + listingId, config);

  return response.data;
};

// Close listing
const closeListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + listingId,
    { status: "closed" },
    config
  );

  return response.data;
};
const listingService = {
  createListing,
  getListings,
  getListing,
  closeListing,
};

export default listingService;
