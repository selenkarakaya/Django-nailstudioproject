import { FaCheck } from "react-icons/fa";
import { BiBadgeCheck } from "react-icons/bi";
import Button from "./Button";

function RegisterForm({ registerUser, passwordRules, handleChange, formData }) {
  return (
    <form className="p-4">
      <div>
        <input
          type="text"
          className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
          id="username"
          name="username"
          placeholder="Enter your name"
          autoComplete="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
          id="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
          id="password"
          name="password"
          placeholder="Enter password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="w-full p-4 ps-10 mb-4 text-sm rounded-lg text-darkBlue focus:outline-darkBlue focus:outline-4"
          id="password2"
          name="password2"
          placeholder="Confirm password"
          autoComplete="new-password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <div id="password-rules-container">
          <ul className="password-rules space-y-4 list-inside pl-5">
            <li
              style={{ color: passwordRules.length ? "#5168C4" : "gray" }}
              className="flex items-center text-lg font-medium"
            >
              <BiBadgeCheck
                style={{ color: passwordRules.length ? "#5168C4" : "gray" }}
                className={`mr-2 ${
                  passwordRules.length ? "animate-shake" : ""
                }`}
              />
              At least 8 characters
            </li>
            <li
              style={{ color: passwordRules.capital ? "#5168C4" : "gray" }}
              className="flex items-center text-lg font-medium"
            >
              <BiBadgeCheck
                style={{ color: passwordRules.capital ? "#5168C4" : "gray" }}
                className={`mr-2 ${
                  passwordRules.capital ? "animate-shake" : ""
                }`}
              />
              Include a capital letter
            </li>
            <li
              style={{ color: passwordRules.symbol ? "#5168C4" : "gray" }}
              className="flex items-center text-lg font-medium"
            >
              <BiBadgeCheck
                style={{ color: passwordRules.symbol ? "#5168C4" : "gray" }}
                className={`mr-2 ${
                  passwordRules.symbol ? "animate-shake" : ""
                }`}
              />
              Include a special symbol (!@#$%^&*)
            </li>
          </ul>
        </div>
        <p className="mb-4 text-right">
          <a href="/login" className="text-darkBlue text-sm italic">
            Sign In
          </a>
        </p>
      </div>
      <div className="text-center">
        <Button text="Submit" onClick={registerUser} type="submit" />
      </div>
    </form>
  );
}

export default RegisterForm;
