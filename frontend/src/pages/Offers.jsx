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
  const [prevListing, setPrevListing] = useState([]);
  const [lastListing, setLastListing] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOfferListings(load)).unwrap().catch(toast.error);
    console.log("1");
  }, [params, load, dispatch]);

  useEffect(() => {
    console.log("2");
    if (listings) {
      if (listings.length !== 0) {
        setCurrnetListing(prevListing.concat(listings));
        setLastListing(false);
      }
    } else {
      setLastListing(true);
    }

    // if there are no more listing to fetch
  }, [listings, setCurrnetListing, prevListing, setLastListing]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // load the next 10 pages
    console.log("3");
    const currentLoad = load + 10;
    setPrevListing(currentListing);
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

          <ul className="categoryListings">
            {currentListing.map((listing) => (
              <ListingItem
                listing={listing}
                id={listing._id}
                key={listing._id}
              />
            ))}
          </ul>
        </main>
        <br />
        <br />
        {lastListing === false ? (
          <p className="loadMore" onClick={onFetchMoreListings}>
            Load More
          </p>
        ) : (
          <p className="Load">Loading Listings</p>
        )}
      </>
    </div>
  );
}

export default Category;
