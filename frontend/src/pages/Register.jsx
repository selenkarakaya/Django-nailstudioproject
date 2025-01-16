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

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError("Passwords do not match");
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
            onChange={(e) => setPassword(e.target.value)}
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
          <p className="mb-4 text-right">
            <Link to="/login" className="text-darkBlue text-sm italic">
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-center">
          <Button text="Submit" onClick={registerUser} />
          <button className="bg-darkBlue border-2 border-darkBlue w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent  hover:text-darkBlue transition duration-1000 delay-150">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
