import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getOfferListings } from "../features/listings/listingSlice";
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
    dispatch(getOfferListings(page)).unwrap().catch(toast.error);
    console.log("1");
  }, [params, page, dispatch]);

  useEffect(() => {
    if (listings === "No listings to load") {
      // if there are no more listing to fetch or category is empty
      setLoading(false);
      setLoadMore(false);
      setLastListing(true);
    } else if (listings) {
      {
        setCurrnetListing(prevListing.concat(listings));
        setLoadMore(false);
        setLastListing(false);
        setLoading(false);
      }
    }
    console.log(listings);
  }, [listings, setLoading, loadMore, setLastListing]);

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
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
