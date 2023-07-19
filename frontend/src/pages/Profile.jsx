import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, update } from "../features/auth/authSlice";
import {
  getUserListings,
  deleteListing,
  getListing,
} from "../features/listings/listingSlice";
import ListingItem from "../components/ListingItem";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import Spinner from "../components/Spinner";

function Profile() {
  const { listings } = useSelector((state) => state.listings);
  const [changeDetails, setChangeDetails] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
  });

  const { name, email } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListings());
  }, [dispatch]);

  const onSubmit = async () => {
    // NOTE: we can unwrap our AsyncThunkACtion here so no need for isError and
    // isSuccess state
    const userData = {
      name,
      email,
    };

    dispatch(update(userData))
      .unwrap()
      .then(() => {
        toast.success(`User details changed - ${user.name}`);
      })
      .catch(toast.error);
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteListing(listingId))
        .unwrap()
        .then(() => {
          toast.success("Listing Deleted");
        })
        .catch(toast.error);
    }
  };

  const onEdit = (listing) => {
    navigate(`/category/${listing.type}/${listing._id}/edit`);
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        {" "}
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change name"}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              id="email"
              className={!changeDetails ? "profileEmail" : "profileEmailActive"}
              disabled={true}
              value={email}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>
        {listings?.length > 0 && (
          <>
            <p className="listingText">Your Listings</p>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  listing={listing}
                  id={listing._id}
                  key={listing._id}
                  onDelete={() => onDelete(listing._id)}
                  onEdit={() => onEdit(listing)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
