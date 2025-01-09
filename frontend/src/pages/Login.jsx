import { useState } from "react";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await api.post("login/", loginData);
      alert("Yay! Logged in successfully!");
      console.log(response.data);
      return response.data;
    } catch (error) {
      setError("Login failed");
      console.error(error);
    }
  };
  return (
    <>
      <section className="flex flex-col items-center">
        <h1>Register</h1>
        <p>Please log in and book</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button className="bg-darkBlue bg-opacity-80 hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
