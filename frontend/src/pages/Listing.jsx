import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSelector, useDispatch } from "react-redux";
import { getListing } from "../features/listings/listingSlice";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Listing() {
  const { listing } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listingId } = useParams();

  useEffect(() => {
    dispatch(getListing(listingId)).unwrap().catch(toast.error);
  }, [listingId, dispatch]);

  if (!listing) {
    return <Spinner />;
  }

  return (
    <main>
      <header>
        <title>{listing.name}</title>
      </header>

      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt="" />
      </div>

      {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p className="listingAdress">{listing.address}</p>
        <p className="listingType">
          For {listing.type === "rent" ? "Rent" : "Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : "1 Bedroom"}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </li>
          <li>{listing.parking && "Parking Spot"}</li>
          <li>{listing.furnished && "Furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Address</p>

        {user._id !== listing.user && (
          <Link
            to={`/contact/${listing.user}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
