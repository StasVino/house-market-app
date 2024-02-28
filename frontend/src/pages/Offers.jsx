import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOfferListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { current } from "@reduxjs/toolkit";

function Category() {
  const { listings } = useSelector((state) => state.listings);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [currentListing, setCurrnetListing] = useState(null);
  const [prevListing, setPrevListing] = useState([]);
  const [lastListing, setLastListing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOfferListings(page)).unwrap().catch(toast.error);
    console.log("This is get listings");
    setCurrnetListing(listings);
  }, [dispatch, setCurrnetListing, page]);

  useEffect(() => {
    if (listings) {
      console.log("current");
      if (listings === "No listings to load") {
        // if  there are not offers
        setLastListing(true);
        setLoading(false);
        setLoadMore(false);
        console.log("empty");
      } else {
        if (currentListing) {
          setCurrnetListing(prevListing.concat(listings));
          setLastListing(false);
          setLoadMore(false);
          setLoading(false);
          console.log("Here!");
        }
      }
    }
  }, [listings, setLoading, setLastListing, setCurrnetListing]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // load the next 10 pages
    const currentPage = page + 10;
    setPrevListing(currentListing);
    dispatch(getOfferListings(currentPage)).unwrap().catch(toast.error);
    setLoadMore(true);
    setPage(currentPage);
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Special Offers !</p>
      </header>

      {loading ? (
        <Spinner />
      ) : currentListing ? (
        <>
          <main>
            <ul className="categoryListings">
              {currentListing.map((listing, index) => (
                <ListingItem listing={listing} key={index} />
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastListing ? (
            <p className="Load">No more listings to load</p>
          ) : loadMore ? (
            <p className="Load">Loading...</p>
          ) : (
            <p className="loadMore" onClick={onFetchMoreListings}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No Special offers available </p>
      )}
    </div>
  );
}

export default Category;
