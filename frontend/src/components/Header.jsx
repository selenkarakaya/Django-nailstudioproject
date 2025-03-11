import { FaSignOutAlt } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Logo from "../assets/image/logo.png";
import api from "../api";
import UserContext from "../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      // Send a logout request to the backend.
      const response = await api.post("logout/");
      if (response.status === 200) {
        toast("Bye for now", {
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setUser(null);
        // Redirect the user to the login page here.
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Link to="/">
          <img src={Logo} alt="logo" className="w-60 h-60" />
        </Link>
      </div>
      <header className="flex flex-col lg:flex-row lg:justify-between items-center justify-center mb-4">
        {/* Logo and Site Name */}
        <div>
          <Link to="/" className="text-darkBlue">
            Selena Nail Studio
          </Link>
        </div>

        {/* Hamburger Icon for Small Devices */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-darkBlue p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Links for Medium and Large Screens */}
        <div className="hidden lg:flex space-x-2">
          <Link
            to="/about"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105"
          >
            About
          </Link>
          <Link
            to="/ourservices"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105"
          >
            Our Services
          </Link>
          <Link
            to="/appointmentBook"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105"
          >
            Book Online
          </Link>
          <Link
            to="/contact"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105"
          >
            Contact
          </Link>
        </div>

        {/* Dropdown Menu for Small Devices */}
        <div
          className={`lg:hidden flex flex-col items-center space-y-4 absolute top-16 left-0 right-0 bg-white p-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/about"
            className="text-darkBlue"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/ourservices"
            className="text-darkBlue"
            onClick={() => setIsMenuOpen(false)}
          >
            Our Services
          </Link>
          <Link
            to="/appointmentBook"
            className="text-darkBlue"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Online
          </Link>
          <Link
            to="/contact"
            className="text-darkBlue"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                className="text-darkBlue"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-darkBlue"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* User Authentication Links */}
        <div className="flex space-x-3 items-center">
          <ul>
            {user ? (
              <div className="flex">
                <Link
                  to="/profile"
                  className="flex items-center space-x-1 px-3 py-1 hover:bg-darkBlue hover:text-white rounded-lg"
                >
                  <RiUserHeartLine className="animate-bounce" />
                  <p>My account</p>
                </Link>
                <div className="flex items-center bg-darkBlue  rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-mediumBlue">
                  <FaSignOutAlt
                    style={{ color: "white", fontSize: "1.2rem" }}
                  />
                  <button
                    type="button"
                    className="text-white"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button className="bg-darkBlue border-2 border-darkBlue px-4 py-2 rounded-lg text-center hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150 mr-1">
                  <Link to="/login">Log in</Link>
                </button>
                <button className="bg-darkBlue border-2 border-darkBlue px-4 py-2 rounded-lg text-center hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150">
                  <Link to="/register">Register</Link>
                </button>
              </div>
            )}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
