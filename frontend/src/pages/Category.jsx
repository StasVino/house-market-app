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

  const [lastFetchedListing, setLastFetchedListing] = useState(true);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const name = params.categoryName;
    dispatch(getCategoryListings(params.categoryName + " " + load));
  }, [params, dispatch]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    setLoad(load + 10);
    dispatch(getCategoryListings(params.categoryName + " " + load));
  };

  if (!listings) {
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
          {listings.map(
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
