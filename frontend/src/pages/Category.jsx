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
    dispatch(getListings(params.categoryName + " " + 0))
      .unwrap()
      .catch(toast.error);
    setCurrnetListing(listings);
  }, [params, dispatch, setCurrnetListing]);

  useEffect(() => {
    if (listings) {
      if (listings === "No listings to load") {
        // if  category is empty
        setLastListing(true);
        setLoading(false);
        setLoadMore(false);
      } else {
        if (listings === "No more listings to load") {
          if (currentListing) {
            setLastListing(true);
            setLoading(false);
            setLoadMore(false);
          } else {
          }
        } else {
          setCurrnetListing(prevListing.concat(listings));
          setLastListing(false);
          setLoadMore(false);
          setLoading(false);
        }
      }
    }
  }, [listings, setLoading, setLastListing, setCurrnetListing]);

  // Pagination / Load More
  const onFetchMoreListings = async () => {
    // load the next 10 pages
    const currentPage = page + 10;
    setPrevListing(currentListing);
    dispatch(getListings(params.categoryName + " " + currentPage));
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
              {currentListing.map((listing, idex) => (
                <ListingItem listing={listing} key={idex} />
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
        <p>No listings for Special offers</p>
      )}
    </div>
  );
}

export default Category;
