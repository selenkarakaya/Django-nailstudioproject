import { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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
      toast.success(`Hey there! 🎉 You’re logged in. Let’s get started!`);

      navigate("/");
      window.location.reload();
      setUser(response.data);
      return response.data;
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
      <form className="p-4" onSubmit={handleSubmit}>
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
          />
          <p className="mb-4">
            <Link to="/register" className="text-darkBlue text-sm italic">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="text-center">
          <button className="bg-darkBlue border-2 border-darkBlue w-1/3 p-4 rounded-lg text-center text-white hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
