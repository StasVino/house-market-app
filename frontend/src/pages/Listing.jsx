import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Helmet } from "react-helmet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useSelector, useDispatch } from "react-redux";
import { getListing } from "../features/listings/listingSlice";
import Spinner from "../components/Spinner";
import shareIcon from "../assets/svg/shareIcon.svg";
//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
      <Helmet>
        <title>{listing.name}</title>
      </Helmet>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.images.map((image) => {
          <SwiperSlide>
            <div>
              <div
                style={{
                  background: image,
                  backgroundSize: "cover",
                }}
                className="swiperSlideDiv"
              >
                <img src={image}></img>
              </div>
            </div>
          </SwiperSlide>;
        })}
      </Swiper>
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
        <p className="listingLocation">{listing.location}</p>
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
        <p className="listingLocationTitle">Location</p>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: "100%", width: "100%" }}
            center={[listing.latitude, listing.longitude]}
            zoom={13}
            scrollWheelZoom={false}
          ></MapContainer>
        </div>
      </div>
    </main>
  );
}

export default Listing;

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

//     {shareLinkCopied && <p className="linkCopied">Link Copied!</p>}

//     <div className="listingDetails">
//       <p className="listingName">
//         {listing.name} - $
//         {listing.offer
//           ? listing.discountedPrice
//               .toString()
//               .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//           : listing.regularPrice
//               .toString()
//               .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//       </p>
//       <p className="listingAdress">{listing.address}</p>
//       <p className="listingType">
//         For {listing.type === "rent" ? "Rent" : "Sale"}
//       </p>
//       {listing.offer && (
//         <p className="discountPrice">
//           ${listing.regularPrice - listing.discountedPrice} discount
//         </p>
//       )}

//       <ul className="listingDetailsList">
//         <li>
//           {listing.bedrooms > 1
//             ? `${listing.bedrooms} Bedrooms`
//             : "1 Bedroom"}
//         </li>
//         <li>
//           {listing.bathrooms > 1
//             ? `${listing.bathrooms} Bathrooms`
//             : "1 Bathroom"}
//         </li>
//         <li>{listing.parking && "Parking Spot"}</li>
//         <li>{listing.furnished && "Furnished"}</li>
//       </ul>

//       <p className="listingLocationTitle">Address</p>
//       <div className="leafletContainer">
//         {/* <MapContainer
//           style={{ height: "100%", width: "100%" }}
//           center={[listing.latitude, listing.longitude]}
//           zoom={13}
//           scrollWheelZoom={false}
//         >
//           <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
//           />

//           <Marker position={[listing.latitude, listing.longitude]}>
//             <Popup>{listing.location}</Popup>
//           </Marker>
//         </MapContainer> */}
//       </div>
//       {user._id !== listing.user && (
//         <Link
//           to={`/contact/${listing.user}?listingName=${listing.name}`}
//           className="primaryButton"
//         >
//           Contact Landlord
//         </Link>
//       )}
//     </div>
