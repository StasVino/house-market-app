import axios from "axios";

const API_URL = "/api/listings/";

// Create new listing
const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(listingData);
  const response = await axios.post(API_URL, listingData, config);
  console.log(response);
  return response.data;
};

// Get user listings
const getUserListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "profile", config);
  return response.data;
};
// Get all listings
const getListings = async (listingsLoadParams) => {
  const response = await axios.get(
    API_URL + "category/" + listingsLoadParams,
    listingsLoadParams
  );
  console.log(response);
  return response.data;
};

// Get offer listings
const getOfferListings = async (listingsLoadParams) => {
  const response = await axios.get(
    API_URL + "offers/" + listingsLoadParams,
    listingsLoadParams
  );
  return response.data;
};

// Get user listing
const getListing = async (listingId) => {
  const response = await axios.get(API_URL + listingId, listingId);
  return response.data;
};

// Update listing
const updateListing = async (listingId, listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + listingId, listingData, config);

  return response.data;
};

// Delete listing
// axios.delete doesnt take data so we pass it in the config
const deleteListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { listingId },
  };
  const response = await axios.delete(
    API_URL + listingId,

    config
  );
  return response.data;
};

const listingService = {
  createListing,
  getUserListings,
  getOfferListings,
  getListings,
  getListing,
  updateListing,
  deleteListing,
};

export default listingService;
