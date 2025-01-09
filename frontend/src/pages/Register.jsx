import api from "../api";
import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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
    console.log("Gönderilen Veriler:", userData);

    try {
      const response = await api.post("user/register/", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Cookie gönderimi gerekiyorsa
      });

      console.log(response.data); // Backend'den gelen yanıtı kontrol et
      alert("Registration successful. You can now log in.");
    } catch (error) {
      console.error("Registration failed:", error.response); // Hata mesajını kontrol et
      setError("Registration failed. Please try again.");
    }
  };
  return (
    <>
      <section className="flex flex-col items-center ">
        <h1>Register</h1>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Confirm password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className="form-group text-center">
            <button className="bg-darkBlue hover:bg-mediumBlue w-1/3 p-4 rounded-lg text-center text-white">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
