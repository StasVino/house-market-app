import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getListings } from "../features/listings/listingSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

function Category() {
  const { listings } = useSelector((state) => state.listings);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [currentListing, setCurrnetListing] = useState(null);
  const [prevListing, setPrevListing] = useState([]);
  const [lastListing, setLastListing] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getListings(params.categoryName + " " + page))
      .unwrap()
      .catch(toast.error);
  }, [params, page, dispatch]);

  useEffect(() => {
    if (listings) {
      if (listings === "No listings to load") {
        // if there are no more listing to fetch or category is empty
        setLoading(false);
        setLoadMore(false);
        setLastListing(true);
      } else if (currentListing) {
        setCurrnetListing(prevListing.concat(listings));
        setLastListing(false);
        setLoadMore(false);
        setLoading(false);
      }
    }
  }, [listings, prevListing, setLoading]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // load the next 10 pages
    const currentPage = page + 10;
    setPrevListing(currentListing);
    //dispatch(getListings(params.categoryName + " " + currentPage));
    setLoadMore(true);
    setPage(currentPage);
  };

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : currentListing && currentListing.length > 0 ? (
        <>
          <main>
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
          ) : loadMore ? (
            <p className="Load">Loading...</p>
          ) : (
            <p className="Load">No more listings to load</p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
