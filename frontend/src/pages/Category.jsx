import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const { listings } = useSelector((state) => state.listings);
  const [load, setLoad] = useState(0);
  const [currentListing, setCurrnetListing] = useState(null);
  const [lastFetchedListing, setLastFetchedListing] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const name = params.categoryName;
    dispatch(getCategoryListings(params.categoryName + " " + load));
  }, [params, dispatch]);

  useEffect(() => {
    setCurrnetListing(listings);
    console.log(currentListing);
  }, [listings]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    const currentLoad = load + 10;

    dispatch(getCategoryListings(params.categoryName + " " + currentLoad));

    setLastFetchedListing(currentListing);
    console.log(currentListing);
    setLoad(currentLoad);
  };

  if (!currentListing) {
    return <Spinner />;
  }

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      <>
        <main>
          <ul className="categoryListings"></ul>
        </main>
        <ul className="categoryListings">
          {currentListing.map(
            (listing) =>
              params.categoryName === listing.type && (
                <ListingItem
                  listing={listing}
                  id={listing._id}
                  key={listing._id}
                />
              )
          )}
        </ul>
        <br />
        <br />
        {lastFetchedListing && (
          <p className="loadMore" onClick={onFetchMoreListings}>
            Load More
          </p>
        )}
      </>
    </div>
  );
}

export default Category;
