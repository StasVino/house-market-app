import { Link } from "react-router-dom";
import { getListings } from "../features/listings/listingSlice";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";

import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import { clearListings } from "../features/listings/listingSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Explore() {
  const dispatch = useDispatch();

  const { listings } = useSelector((state) => state.listings);
  useEffect(() => {
    dispatch(clearListings());
  }, [dispatch]);
  return (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>

      <main>
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to="/category/rent">
            <img
              src={rentCategoryImage}
              alt="rent"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to="/category/sale">
            <img
              src={sellCategoryImage}
              alt="sell"
              className="exploreCategoryImg"
            />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
