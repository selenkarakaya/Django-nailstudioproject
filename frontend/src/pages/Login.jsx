import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "../components/Button";
import UserContext from "../context/UserContext";

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log("API Base URL:", api.defaults.baseURL);

  const loginUser = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    try {
      const response = await api.post("/login/", loginData);
      console.log("Login Response:", response); // Tüm yanıtı loglayın

      if (response.data.access) {
        console.log("Access Token:", response.data.access);
      } else {
        console.log("Access token yok");
      }
      toast.success(`Hey there! 🎉 You’re logged in. Let’s get started!`);

      // ✅ Fetch and update user data
      const userResponse = await api.get("/profile/");
      setUser(userResponse.data); // Updates the user state in context
      navigate("/"); // Redirects to the homepage
    } catch (error) {
      toast.error(`Whoops! Looks like something’s off. Try again, champ! 💪`);
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center mt-10 bg-lightBg w-2/3 mx-auto rounded-xl">
      <header className="flex flex-col items-center my-4 text-darkBlue">
        <h1 className="font-bold">Sign in</h1>
        <p className="italic text-sm">
          Sign in with your email or sign up to become a our member.
        </p>
      </header>
      <form className="p-4" onSubmit={loginUser}>
        <div>
          <input
            type="email"
            className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full p-4 ps-10 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={onChange}
            autoComplete="current-password"
          />
          <p className="mb-4">
            <Link to="/register" className="text-darkBlue text-sm italic">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Button text="Submit" onClick={loginUser} />
        </div>
      </form>
    </div>
  );
}

export default Login;
