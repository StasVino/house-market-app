import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Category from './pages/Category';
import CreateListing from './pages/CreateListings';
import PrivateRoute from './components/PrivateRoute';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Listing from './pages/Listing';
import EditListing from './pages/EditListing';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route
              path="//category/:categoryName/:listingId"
              element={<Listing />}
            />
            <Route
              path="//category/:categoryName/:listingId/edit"
              element={<EditListing />}
            />

            <Route path="/contact/:landlordId" element={<Contact />} />
          </Routes>
        </div>
        <Navbar />
      </Router>
    </>
  );
}

export default App;
