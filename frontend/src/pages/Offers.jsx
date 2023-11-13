import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOfferListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const { listings } = useSelector((state) => state.listings);
  const [load, setLoad] = useState(0);
  const [currentListing, setCurrnetListing] = useState(null);
  const [lastListing, setLastListing] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOfferListings(load)).unwrap().catch(toast.error);
  }, [params, dispatch]);

  useEffect(() => {
    listings && setCurrnetListing(listings);
    // if there are no more listing to fetch
    currentListing === null ? setLastListing(true) : setLastListing(false);
  }, [listings, setLastListing]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // load the next 10 pages
    const currentLoad = load + 10;
    dispatch(getOfferListings(currentLoad)).unwrap().catch(toast.error);

    setLoad(currentLoad);
  };

  if (!currentListing) {
    return <Spinner />;
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Special Offers</p>
      </header>

      <>
        <main>
          <ul className="categoryListings"></ul>
        </main>
        <ul className="categoryListings">
          {currentListing.map((listing) => (
            <ListingItem listing={listing} id={listing._id} key={listing._id} />
          ))}
        </ul>
        <br />
        <br />
        {lastListing === false ? (
          <p className="loadMore" onClick={onFetchMoreListings}>
            Load More
          </p>
        ) : (
          <p className="noLoad" onClick={onFetchMoreListings}>
            No more listings to load
          </p>
        )}
      </>
    </div>
  );
}

export default Category;
