import { FaSignOutAlt } from "react-icons/fa";
import { RiUserHeartLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../assets/image/logo.png";
import api from "../api";

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Backend'e logout isteği gönder
      const response = await api.post("logout/");

      if (response.status === 200) {
        console.log("Logout successful");
        // Burada kullanıcıyı login sayfasına yönlendirebilirsiniz
        window.location.href = "/login"; // veya react-router kullanıyorsanız Navigate ile yönlendirme yapabilirsiniz
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
            Selene Nail Studio
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
            to="/contact"
            className="hover:bg-mediumBlue md:p-7 hover:scale-105 invisible md:visible"
          >
            Contact
          </Link>
        </div>
        <div className="flex space-x-3 items-center">
          <ul>
            <div className="flex">
              <Link
                to="/Profile"
                className="flex items-center space-x-1 px-3 py-1 hover:bg-darkBlue hover:text-white rounded-lg"
              >
                <RiUserHeartLine className="animate-bounce" />
                <p>My account</p>
              </Link>
              <div className="flex items-center bg-darkBlue  rounded-lg px-2 py-2 space-x-1 hover:scale-105 hover:bg-mediumBlue">
                <FaSignOutAlt style={{ color: "white", fontSize: "1.2rem" }} />
                <button
                  type="button"
                  className=" text-white "
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </div>

            <>
              <button className=" text-white  bg-darkBlue px-3 py-1 hover:scale-105 hover:bg-mediumBlue rounded-lg mr-1">
                <Link to="/login">Log in</Link>
              </button>
              <button className=" text-white rounded-lg bg-darkBlue px-3 py-1 hover:scale-105 hover:bg-mediumBlue animate-bounce">
                <Link to="/register">Register</Link>
              </button>
            </>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
