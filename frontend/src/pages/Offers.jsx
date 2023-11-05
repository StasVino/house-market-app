import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoryListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const { listings } = useSelector((state) => state.listings);
  const [loading, setLoading] = useState(0);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListings());
  }, [dispatch]);

  if (!listings) {
    return <Spinner />;
  }
  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {listings.length > 0 ? (
        <>
          <ul className="categoryListings">
            {listings.map(
              (listing) =>
                listing.offer === true && (
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
          {lastFetchedListing}
        </>
      ) : (
        <p>There are no current offers </p>
      )}
    </div>
  );
}

export default Offers;
