import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListings());
  }, [dispatch]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">Offers</p>
      </header>

      {listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => {
                console.log(listings.length);
                console.log(listing.offer);
                listing.offer === true && (
                  <ListingItem
                    listing={listing.data}
                    id={listing.id}
                    key={listing.id}
                  />
                );
              })}
            </ul>
          </main>

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
