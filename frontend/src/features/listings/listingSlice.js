import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingService from "./listingService";
// NOTE: use a extractErrorMessage function to save some repetition update
import { extractErrorMessage } from "../../utils";

const initialState = {
  listings: null,
  listing: null,
};

export const createListing = createAsyncThunk(
  "listings/create",
  async (listingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.createListing(listingData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get user listings
export const getAllListings = createAsyncThunk(
  "listings/getAll",
  async (_, thunkAPI) => {
    try {
      return await listingService.getAllListings();
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getUserListings = createAsyncThunk(
  "listings/profile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.getUserListings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Get listing
export const getListing = createAsyncThunk(
  "listings/get",
  async (listingId, thunkAPI) => {
    try {
      return await listingService.getListing(listingId);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

// Update listing
export const updateListing = createAsyncThunk(
  "listings/edit",
  async (listingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const listingId = thunkAPI.getState().listings.listing._id;
      return await listingService.updateListing(listingId, listingData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const deleteListing = createAsyncThunk(
  "listings/delete",
  async (listingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await listingService.deleteListing(listingId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const listingSlice = createSlice({
  name: "listing",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserListings.pending, (state) => {
        // NOTE: clear single listing on listings page, this replaces need for
        // loading state on individual listing
        state.listings = null;
      })
      .addCase(getUserListings.fulfilled, (state, action) => {
        state.listings = action.payload;
      })
      .addCase(getAllListings.pending, (state) => {
        // NOTE: clear single listing on listings page, this replaces need for
        // loading state on individual listing
        state.listings = null;
      })
      .addCase(getAllListings.fulfilled, (state, action) => {
        state.listings = action.payload;
      })
      .addCase(getListing.pending, (state) => {
        // NOTE: clear single listing on listings page, this replaces need for
        // loading state on individual listing
        state.listing = null;
      })
      .addCase(getListing.fulfilled, (state, action) => {
        state.listing = action.payload;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.listings = state.listings.map((listing) =>
          listing._id === action.payload._id ? action.payload : listing
        );
      })
      // .addCase(deleteListing.pending, (state, action) => {
      //   state.listings = null;
      // })
      .addCase(deleteListing.fulfilled, (state, action) => {
        console.log(action.payload);
        state.listings.map((listing) => {
          console.log(listing._id);
        });
        state.listings.filter((listing) => listing._id !== action.payload);
      });
  },
});

export default listingSlice.reducer;
