import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "../components/Button";
import { FaCheck } from "react-icons/fa";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordRules, ssetPasswordRules] = useState({
    length: false,
    capital: false,
    symbol: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex
    return emailRegex.test(email);
  };

  const validatePasswordRules = (password) => {
    ssetPasswordRules({
      length: password.length >= 8,
      capital: /[A-Z]/.test(password),
      symbol: /[!@#$%^&*?.,+-]/.test(password),
    });
  };
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*?.,+-])(?=.{8,})/;
    return passwordRegex.test(password);
  };
  const registerUser = async (e) => {
    e.preventDefault();
    // Email verification
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }
    // Password verification
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long, include a capital letter, and a special symbol!"
      );
      return;
    }
    if (password !== password2) {
      toast.error(`Passwords do not match`);
      return;
    }
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await api.post("/user/register/", userData);
      console.log("Registration Success:", response.data);
      toast.success(
        "You’ve successfully registered! 🎉 Feel free to log in now."
      );
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.username) {
          toast.error(errorData.username[0]);
        }
        if (errorData.email) {
          toast.error(errorData.email[0]); //
        } else {
          toast.error("Something went wrong. Please check your connection. 🚦");
        }
      }
      console.error("Registration failed:", error.response); //Check the error message.
      console.error("Registration failed:", error.response?.data);
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswordRules(newPassword);
  };
  return (
    <div className="flex flex-col items-center mt-10 bg-lightBg w-2/3 mx-auto rounded-xl">
      <header className="flex flex-col items-center my-4 text-darkBlue">
        <h1 className="font-bold">Register</h1>
        <p className="italic text-sm">Please create an account</p>
      </header>
      <form onSubmit={registerUser} className="p-4">
        <div>
          <input
            type="text"
            className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
            id="password2"
            name="password2"
            placeholder="Confirm password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div id="password-rules-container">
            <ul className="password-rules space-y-4 list-inside pl-5">
              <li
                style={{ color: passwordRules.length ? "#5168C4" : "gray" }}
                className="flex items-center text-lg font-medium"
              >
                <FaCheck
                  style={{ color: passwordRules.length ? "#5168C4" : "gray" }}
                  className={`mr-2 ${
                    passwordRules.length ? "animate-shake" : ""
                  }`} // Shake when fulfilled
                />
                At least 8 characters
              </li>
              <li
                style={{ color: passwordRules.capital ? "#5168C4" : "gray" }}
                className="flex items-center text-lg font-medium"
              >
                <FaCheck
                  style={{ color: passwordRules.capital ? "#5168C4" : "gray" }}
                  className={`mr-2 ${
                    passwordRules.capital ? "animate-shake" : ""
                  }`} // Shake when fulfilled
                />
                Include a capital letter
              </li>
              <li
                style={{ color: passwordRules.symbol ? "#5168C4" : "gray" }}
                className="flex items-center text-lg font-medium"
              >
                <FaCheck
                  style={{ color: passwordRules.symbol ? "#5168C4" : "gray" }}
                  className={`mr-2 ${
                    passwordRules.symbol ? "animate-shake" : ""
                  }`} // Shake when fulfilled
                />
                Include a special symbol (!@#$%^&*)
              </li>
            </ul>
          </div>
          <p className="mb-4 text-right">
            <Link to="/login" className="text-darkBlue text-sm italic">
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Button text="Submit" onClick={registerUser} type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Register;
