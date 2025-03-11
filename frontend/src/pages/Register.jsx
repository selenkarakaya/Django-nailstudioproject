import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import Button from "../components/Button";
import { FaCheck } from "react-icons/fa";
import RegisterForm from "../components/RegisterForm";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    capital: false,
    symbol: false,
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordRules = (password) => {
    setPasswordRules({
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

    const { username, email, password, password2 } = formData;

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
      toast.error("Passwords do not match");
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
          toast.error(errorData.email[0]);
        } else {
          toast.error("Something went wrong. Please check your connection. 🚦");
        }
      }
      console.error("Registration failed:", error.response);
      console.error("Registration failed:", error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") {
      validatePasswordRules(value);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 bg-lightBg md:w-2/3 w-4/5 mx-auto rounded-xl">
      <header className="flex flex-col items-center my-4 text-darkBlue">
        <h1 className="font-bold">Register</h1>
        <p className="italic text-sm">Please create an account</p>
      </header>
      <RegisterForm
        registerUser={registerUser}
        passwordRules={passwordRules}
        handleChange={handleChange}
        formData={formData}
      />
    </div>
  );
}

export default Register;
