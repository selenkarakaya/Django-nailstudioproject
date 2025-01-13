import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };
    try {
      const response = await api.post("login/", loginData);
      toast.success(`Hello 🫂  Yay! Logged in successfully!`);
      navigate("/");
      window.location.reload();
      return response.data;
    } catch (error) {
      toast.error(`Please check your details!`);
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center mt-10 bg-mediumBlue w-1/2 mx-auto rounded-xl">
      <header className="flex flex-col items-center my-4">
        <h1>Sign in</h1>
        <p>Sign in with your email or sign up to become a our member.</p>
      </header>

      <form className="p-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            className="w-full p-4 ps-10 text-sm rounded-lg text-darkBlue focus:outline-darkYellow focus:outline-4"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={onChange}
          />
          <input
            type="password"
            className="w-full p-4 ps-10 text-sm rounded-lg text-darkBlue focus:outline-darkYellow focus:outline-4"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={onChange}
          />

          <p className="my-4">
            <Link to="/register" className="text-mediumGreen ml-2">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="form-group text-center">
          <button className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
