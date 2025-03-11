import { useContext } from "react";
import { Link } from "react-router-dom";
import ApptForm from "../components/ApptForm";
import UserContext from "../context/UserContext";

function ApptBook() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <section className="flex flex-col items-center">
        <h1>How can we make your day better?</h1>
        <h4>Please choose an option below to get started</h4>
        <h1 className="mb-4 text-darkBlue italic tracking-[4px] font-bold">
          Fresh Nail • Fresh You
        </h1>
      </section>
      {user ? (
        <ApptForm />
      ) : (
        <button className="bg-darkBlue border-2 border-darkBlue px-4 py-2 rounded-lg text-center hover:bg-transparent hover:text-darkBlue transition duration-1000 delay-150 mr-1">
          <Link to="/login">Log in</Link>
        </button>
      )}
    </div>
  );
}

export default ApptBook;
