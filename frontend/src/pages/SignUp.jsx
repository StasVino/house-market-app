import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import Spinner from "../components/Spinner";

function SignUP() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData))
        .unwrap()
        .then((user) => {
          // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
          // getting a good response from our API or catch the AsyncThunkAction
          // rejection to show an error message
          toast.success(`Registered new user - ${user.name}`);
          navigate("/");
        })
        .catch(toast.error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Please Sign Up</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password"
              required
            />

            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />

            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUP;
