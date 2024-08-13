import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setDefaults, fromAddress } from 'react-geocode';
import SwiperCore, { Pagination } from 'swiper/modules';
import { Helmet } from 'react-helmet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useSelector, useDispatch } from 'react-redux';
import { getListing } from '../features/listings/listingSlice';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';

function Listing() {
  const { listing } = useSelector((state) => state.listings);
  const { user } = useSelector((state) => state.auth);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitode: 0,
    zoom: 12,
    width: '100%',
    height: '500pc',
  });
  const dispatch = useDispatch();
  const { listingId } = useParams();

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODEING_API_KEY,
    language: 'en',
    region: 'il',
  });

  useEffect(() => {
    dispatch(getListing(listingId)).unwrap().catch(toast.error);
  }, [dispatch]);

  if (!listing) {
    return <Spinner />;
  }

  return (
    <main>
      <Helmet>
        <title>{listing.name}</title>
      </Helmet>
      <Swiper modules={[Pagination]} className="mySwiper" pagination={true}>
        {listing.images.map((image) => (
          <SwiperSlide key={image}>
            <img
              src={image}
              alt={listing.name}
              className="swiperSlideDiv"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
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
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
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
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        <p className="listingLocationTitle">Location</p>

        <div className="leafletContainer">
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.latitude, listing.longitude]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.latitude, listing.longitude]}>
              <Popup>{listing.adress}</Popup>
            </Marker>
          </MapContainer>
        </div>
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
