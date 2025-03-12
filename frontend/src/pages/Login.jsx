import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "../components/Button";
import UserContext from "../context/UserContext";
import Spinner from "../components/Spinner";

function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);

    // Clear errors after 2 seconds (3000ms)
    setTimeout(() => {
      setErrors({
        email: "",
        password: "",
      });
    }, 2000);

    return !newErrors.email && !newErrors.password;
  };

  const loginUser = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const loginData = { email, password };
    try {
      const response = await api.post("/login/", loginData);
      toast.success(`Hey there! 🎉 You’re logged in. Let’s get started!`);

      // Fetch and update user data
      const userResponse = await api.get("/profile/");
      setUser(userResponse.data); // Updates the user state in context
      navigate("/"); // Redirects to the homepage
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        // Handle invalid credentials error
        if (errorData.non_field_errors) {
          toast.error(
            `Invalid credentials. Please check your email and password.`
          );
        } else {
          toast.error(
            "Whoops! Looks like something’s off. Try again, champ! 💪"
          );
        }
      }
      console.error(error);
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-lightBg md:w-2/3 w-4/5 mx-auto rounded-xl">
      <header className="flex flex-col items-center my-4 text-darkBlue p-4">
        <h1 className="font-bold">Sign in</h1>
        <p className="italic text-sm">
          Sign in with your email or sign up to become a member.
        </p>
      </header>
      <form className="p-4">
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
            autoComplete="email"
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
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <p className="mb-4">
            <Link to="/register" className="text-darkBlue text-sm italic">
              Sign Up
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Button text="Submit" onClick={loginUser} />
          {loading && <Spinner />}
        </div>
      </form>
    </div>
  );
}

export default Login;
