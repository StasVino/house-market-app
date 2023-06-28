import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Contact() {
  const [message, setMessage] = useState("");
  const { listing } = useSelector((state) => state.listings);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>

      {listing.landlordName !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {listing.landlordName}</p>
          </div>

          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${listing.landlordEmail}?Subject=${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;
