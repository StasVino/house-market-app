import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const { listings } = useSelector((state) => state.listings);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    dispatch(getListings());
  }, [dispatch]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {};
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
          {listings.map((listing) => (
            <ListingItem
              listing={listing.data}
              id={listing.id}
              key={listing.id}
            />
          ))}
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
