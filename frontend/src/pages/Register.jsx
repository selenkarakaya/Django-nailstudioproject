import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "../components/Button";

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
      const response = await api.post("user/register/", userData);
      toast.success(
        "You’ve successfully registered! 🎉 Feel free to log in now."
      );
      navigate("login");
      // console.log(response.data); //Check the response from the backend
    } catch (error) {
      toast.error(`Not quite there yet. Check and try again! 🚦`);
      console.error("Registration failed:", error.response); //Check the error message.
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
          <ul className="password-rules">
            <li style={{ color: passwordRules.length ? "blue" : "gray" }}>
              At least 8 characters
            </li>
            <li style={{ color: passwordRules.capital ? "blue" : "gray" }}>
              Include a capital letter
            </li>
            <li style={{ color: passwordRules.symbol ? "blue" : "gray" }}>
              Include a special symbol (!@#$%^&*)
            </li>
          </ul>
          <p className="mb-4 text-right">
            <Link to="/login" className="text-darkBlue text-sm italic">
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Button text="Submit" onClick={registerUser} />
          {/* <button className="bg-darkBlue border-2 border-darkBlue w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent  hover:text-darkBlue transition duration-1000 delay-150">
            Submit
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default Register;
