import { FaSignOutAlt } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Logo from "../assets/image/logo.png";
import api from "../api";
import UserContext from "../context/UserContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      //Send a logout request to the backend.
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
        //You can redirect the user to the login page here.
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
        <div>
          <Link to="/" className="text-darkBlue">
            Selena Nail Studio
          </Link>
        </div>
        <div className="space-x-2 flex">
          <Link
            to="/"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            Welcome
          </Link>
          <Link
            to="/about"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            About
          </Link>
          <Link
            to="/ourservices"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            Our Services
          </Link>
          <Link
            to="/appointmentBook"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            Book Online
          </Link>
          <Link
            to="/contact"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            Contact
          </Link>
        </div>
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
                    className=" text-white "
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
